FROM node:lts-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV production

RUN apk update
RUN npm install -g pnpm

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN pnpm install

COPY --chown=node:node . .

RUN pnpm run node:build

EXPOSE 3000

CMD ["pnpm", "run", "node:start"]