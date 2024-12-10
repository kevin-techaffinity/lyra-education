FROM node:16-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

EXPOSE 3004

<<<<<<< HEAD
CMD [ "npm","run","start" ]
=======
CMD [ "npm","run","start" ]
>>>>>>> 4e14d8c9746431388daf3211d15519069fba19f6
