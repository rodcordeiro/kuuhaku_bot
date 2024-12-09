FROM node:20 AS builder

WORKDIR /vault

COPY . .

RUN yarn && yarn build

CMD [ "yarn", "start:dev" ]
