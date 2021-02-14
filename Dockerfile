FROM node:10.15

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

RUN npm install -g typescript@latest

COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "run", "start" ]