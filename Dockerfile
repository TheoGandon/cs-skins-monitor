FROM node:18 AS build

# Allow build-time injection of Vite variables (they are baked into the static build)
ARG VITE_SKINPORT_API
ENV VITE_SKINPORT_API=${VITE_SKINPORT_API}

# Répertoire de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie des fichiers source du projet
COPY . .

# Construction de l'application avec Vite
RUN npm run build

FROM nginx:alpine

# Copie les fichiers construits dans le conteneur Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copier le fichier de configuration Nginx personnalisé
COPY nginx.conf /etc/nginx/nginx.conf

# Exposition du port
EXPOSE 80

# Lancer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]