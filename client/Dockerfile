FROM node:alpine

RUN mkdir -p /usr/src/app

ENV PORT 5051

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 5051

ENTRYPOINT ["npm", "run"]