FROM node:14.17.6-alpine3.12 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

#RUN npm install --only=development TODO: Ver pois não consigo instalar pacotes de produção em desenvlvimento.
RUN npm install

COPY . .

RUN npm run build

FROM node:14.17.6-alpine3.12 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install --only-production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm","run"," start:prod"]

# refs:
# - https://dev.to/erezhod/setting-up-a-nestjs-project-with-docker-for-back-end-development-30lg
# - https://blog.logrocket.com/containerized-development-nestjs-docker/