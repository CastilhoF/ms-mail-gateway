FROM node:18.16.0-alpine3.16 as build

WORKDIR /usr/app

COPY package.json ./
RUN yarn install

COPY nest-cli.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY src ./src

RUN yarn build

FROM node:18.16.0-alpine3.16 as run

WORKDIR /usr/app

COPY package*.json ./
RUN yarn install --production && yarn cache clean

COPY --from=build /usr/app/dist ./dist
COPY ./template/send-mail-template.hbs ./template/

RUN mkdir "logs"

ENTRYPOINT ["yarn", "start:prod"]