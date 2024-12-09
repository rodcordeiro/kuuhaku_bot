FROM node:22 AS builder

WORKDIR /vault

COPY . .

RUN npm i && npm i run build

CMD [ "npm", "start:dev" ]
