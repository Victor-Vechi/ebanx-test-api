FROM node:22.22.3

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 3000

CMD [ "npm", "start"]