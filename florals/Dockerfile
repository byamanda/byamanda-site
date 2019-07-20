#########################
#         BUILD         #
#########################
FROM node:latest as builder

COPY . /app
WORKDIR /app

ENV NODE_ENV production

RUN npm ci
RUN npm run build

#########################
#         FINAL         #
#########################
FROM nginx:latest

WORKDIR /usr/service

COPY --from=builder /app/public ./public
COPY --from=builder /app/boot.sh ./boot.sh

EXPOSE 80

RUN ["chmod", "+x", "./boot.sh"]
ENTRYPOINT ["/usr/service/boot.sh"]
