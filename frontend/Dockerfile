FROM --platform=linux/x86_64 node:20.9-bullseye as deploy

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

ENTRYPOINT [ "npm", "start" ]

FROM node:20.9-bullseye as dev

WORKDIR /workspace/frontend

RUN npm install -g npm@latest

CMD [ "npm", "run", "dev" ]

FROM node:20.9-bullseye-slim as dev-mock

WORKDIR /workspace/frontend

RUN npm install -g json-server

CMD [ "json-server", "--watch", "db.json", "--host", "0.0.0.0"]
