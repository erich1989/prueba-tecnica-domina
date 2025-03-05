# Usamos una imagen base de Node.js
FROM node:20-alpine

# Establecemos el directorio de trabajo en la carpeta /app
WORKDIR /app

# Definimos las variables de entorno
ENV PORT=4000

# Copiamos los archivos de package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente al contenedor
COPY . .

# Exponemos el puerto en el que se ejecuta la aplicación
EXPOSE 4000

# Definimos el comando por defecto para correr la aplicación
CMD ["npm", "start"]