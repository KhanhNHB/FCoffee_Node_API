FROM node:alpine

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn install
COPY . .

CMD ["yarn", "start"]