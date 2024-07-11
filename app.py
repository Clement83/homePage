import logging
from flask import Flask, render_template, request, jsonify, send_from_directory
import json
import requests
from requests.auth import HTTPBasicAuth
import os

app = Flask(__name__)

# Configuration pour désactiver le cache des templates
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Configuration de la journalisation
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Chargement de la configuration depuis config.json
with open('config.json') as config_file:
    config_data = json.load(config_file)

@app.route('/')
def index():
    logger.info("Home page accessed")
    return render_template('index.html', sites=config_data['sites'], config=config_data['config'])

@app.route('/trigger', methods=['POST'])
def trigger_webhook():
    data = request.json
    id = data.get('id')
    base_url = os.getenv('OLIVETIN_URL')
    full_url = f"{base_url}{id}"

    logger.info(f"Webhook triggered: {full_url}")

    if not id:
        logger.error("ID missing in request")
        return jsonify({"error": "ID is required"}), 400

    # Crée une session pour gérer les cookies
    session = requests.Session()

    # Ajoute les cookies de la requête entrante à la session
    for cookie_name, cookie_value in request.cookies.items():
        session.cookies.set(cookie_name, cookie_value)

    try:
        # Fait la requête avec la session contenant les cookies
        response = session.get(full_url)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        logger.info(f"Webhook successful: {full_url}")
        return jsonify({"status": "success", "response": response.json()})
    except requests.exceptions.RequestException as e:
        logger.error(f"Webhook failed: {full_url}, error: {str(e)}")
        return jsonify({"status": "error", "error": str(e)}), 500

# Route pour servir le fichier manifest.json
@app.route('/manifest.json')
def manifest():
    return send_from_directory(directory='.', path='manifest.json', mimetype='application/json')

# Route pour servir le fichier service-worker.js
@app.route('/service-worker.js')
def service_worker():
    response = send_from_directory(directory='.', path='service-worker.js', mimetype='application/javascript')
    # Désactiver le cache pour ce fichier
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
