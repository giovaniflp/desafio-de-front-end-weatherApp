# Use a imagem oficial do Node.js como base
FROM node:20

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código do projeto
COPY . .

# Construa o projeto Next.js
RUN npm run build

# Exponha a porta que o Next.js usará
EXPOSE 3000

# Comando para rodar o aplicativo Next.js
CMD ["npm", "start"]
