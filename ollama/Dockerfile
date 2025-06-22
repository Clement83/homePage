# Base Node.js légère
FROM node:22-alpine

# Dossier de travail dans le container
WORKDIR /usr/src/app

COPY . .

# Exposer le port (par défaut 3000, peut être changé par variable d'env)
EXPOSE 5156

# Commande pour démarrer le serveur (adapter si nécessaire)
CMD ["node", "server.js"]

