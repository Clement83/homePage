import logging
from flask import Flask, render_template, request, jsonify
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
    base_url =  os.getenv('OLIVETIN_URL')
    full_url = f"{base_url}{id}"
    username = os.getenv('WEBHOOK_USERNAME')
    password = os.getenv('WEBHOOK_PASSWORD')

    logger.info(f"Webhook triggered: {full_url}")

    if not id or not username or not password:
        logger.error("ID, username, or password missing in request")
        return jsonify({"error": "ID, username, and password are required"}), 400

    try:
        response = requests.get(full_url, auth=HTTPBasicAuth(username, password))
        response.raise_for_status()  # Raise an HTTPError for bad responses
        logger.info(f"Webhook successful: {full_url}")
        return jsonify({"status": "success", "response": response.json()})
    except requests.exceptions.RequestException as e:
        logger.error(f"Webhook failed: {full_url}, error: {str(e)}")
        return jsonify({"status": "error", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
