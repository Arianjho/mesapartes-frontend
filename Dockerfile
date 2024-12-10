# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el proyecto al contenedor
COPY . .

# Expone el puerto 4200 para ng serve
EXPOSE 4200

# Comando para ejecutar ng serve
CMD ["npm", "run", "start"]
