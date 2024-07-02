FROM node:20.9-bullseye-slim

WORKDIR /workspace/frontend

RUN npm install -g json-server@0.17.4

CMD [ "json-server", "--watch", "./mock/db.json", "--routes", "./mock/routes.json", "--host", "0.0.0.0"]
