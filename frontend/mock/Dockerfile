FROM node:20.9-bullseye-slim

WORKDIR /workspace

RUN npm install -g json-server@0.17.4

CMD [ "json-server", "--watch", "db.json", "--routes", "routes.json", "--host", "0.0.0.0"]
