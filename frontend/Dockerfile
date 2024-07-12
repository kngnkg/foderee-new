FROM --platform=linux/x86_64 node:20.9-bullseye as deploy

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

ENTRYPOINT [ "npm", "start" ]

FROM node:20.9-bullseye as dev

WORKDIR /workspace/frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./

RUN npm install -g npm@latest

RUN npm ci

CMD [ "npm", "run", "dev" ]
