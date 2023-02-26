FROM node:16

RUN mkdir /usr/app
WORKDIR /usr/app

COPY yarn.lock .
COPY package.json .

RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn", "start"]
