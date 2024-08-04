FROM node:18

WORKDIR /app

COPY package.json ./
RUN npm cache clean --force
RUN npm install

COPY . .

ENV PORT=80

EXPOSE 80

CMD ["npm", "run" ,"start"]
