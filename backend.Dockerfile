FROM node:22-alpine

COPY . ./app

WORKDIR /app

RUN yarn install

VOLUME ./backend/src:/app/backend/src

ENTRYPOINT yarn workspace techlab-challenge-2024-3q-backend dev
