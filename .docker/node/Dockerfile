FROM node:16.17

WORKDIR /app

COPY .yarn /app/.yarn

COPY yarn.lock /app/yarn.lock
COPY .yarnrc.yml /app/.yarnrc.yml
COPY .pnp.cjs /app/.pnp.cjs
COPY .pnp.loader.mjs /app/.pnp.loader.mjs
COPY package.json /app/package.json

COPY entries/backend/package.json /app/entries/backend/package.json
COPY entries/backend/dist /app/entries/backend/dist

RUN chown -R node:node /app

USER node

CMD yarn prod
