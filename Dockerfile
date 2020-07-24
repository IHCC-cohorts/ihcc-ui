FROM node:12.16.1-alpine

WORKDIR /app
COPY . .
RUN npm ci

EXPOSE 5000

CMD [ "npm", "run", "buildAndServe" ]