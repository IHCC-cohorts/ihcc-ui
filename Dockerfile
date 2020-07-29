FROM node:12.16.1-alpine

WORKDIR /app
COPY . .
RUN npm ci

# this is just a test build 
RUN npm run build 

EXPOSE 5000

CMD [ "npm", "run", "buildAndServe" ]