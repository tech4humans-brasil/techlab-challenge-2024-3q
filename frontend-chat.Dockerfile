FROM node:22-alpine

COPY . ./app

WORKDIR /app

RUN yarn install

RUN yarn workspace techlab-challenge-2024-3q-frontend-chat build

VOLUME ./frontend-chat/src:/app/frontend-chat/src

ENTRYPOINT yarn workspace techlab-challenge-2024-3q-frontend-chat serve -s dist -p $PORT
