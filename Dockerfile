FROM node:18

WORKDIR /app

COPY . /app

RUN npm ci

RUN npm start

EXPOSE 3000

CMD ["npx", "server", "dist"]