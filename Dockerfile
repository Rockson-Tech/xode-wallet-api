FROM node:18.16.1-alpine

WORKDIR /app

COPY package.json .

RUN npm install -g npm@9.8.1
RUN npm install

COPY . .

RUN npm run prisma:generate

EXPOSE 3008

CMD ["npm", "run", "start"]
