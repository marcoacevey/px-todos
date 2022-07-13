FROM node:14.17.6-alpine3.12 AS development

WORKDIR /usr/src/app/app-ui

COPY package*.json ./

RUN npm install -g @ionic/cli 

RUN npm install

COPY . .

CMD ["ionic","serve"]

FROM nginx:alpine AS production

RUN npm run-script build --prod

RUN rm -rf /usr/share/nginx/html/*

COPY --from=development /app-ui/www/ /usr/share/nginx/html/

# refs:
# - https://blog.knoldus.com/deployment-with-docker-in-ionic/
# - https://medium.com/bb-tutorials-and-thoughts/angular-local-development-with-docker-compose-13719b998e42