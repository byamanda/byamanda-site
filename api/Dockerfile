FROM node:latest 

WORKDIR /app 

COPY package.json /app 
RUN npm install 

COPY . /app
RUN npm run build

ENV NODE_ENV=production

ENTRYPOINT [ "./wait-for-it.sh", "-t", "15", "db:5432", "--", "node", "./dist/start.js"]