FROM node:16-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

EXPOSE 3004

CMD [ "npm","run","start" ]