FROM node:22-alpine

COPY . ./app

WORKDIR /app

RUN yarn install

RUN yarn workspace techlab-challenge-2024-3q-frontend-backoffice build

VOLUME ./frontend-backoffice/src:/app/frontend-backoffice/src

EXPOSE $PORT

ENTRYPOINT yarn workspace techlab-challenge-2024-3q-frontend-backoffice serve -s dist -p $PORT
