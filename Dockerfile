FROM node:17.5.0

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]