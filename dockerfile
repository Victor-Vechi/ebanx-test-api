FROM node:22.22.3

WORKDIR /app

COPY . .

RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

EXPOSE 3000

WORKDIR /app

CMD [ "npm", "run", "start:dev" ]