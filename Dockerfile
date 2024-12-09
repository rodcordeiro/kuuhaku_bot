FROM node:20 AS builder

WORKDIR /vault

COPY . .

RUN npm i && npm i run build

CMD [ "npm", "run start:dev" ]
