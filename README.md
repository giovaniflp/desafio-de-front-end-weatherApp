O projeto está com Deploy na Vercel e rodando no docker

Para rodar no Docker rode os seguintes comandos:

#Cria a imagem Docker
docker build -t my-nextjs-app .

E após

#Roda o container
docker run -p 3000:3000 my-nextjs-app
