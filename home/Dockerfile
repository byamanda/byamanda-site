FROM nginx:latest

WORKDIR /usr/service

COPY ./public ./public
COPY ./boot.sh ./boot.sh

EXPOSE 80

RUN ["chmod", "+x", "./boot.sh"]
ENTRYPOINT ["/usr/service/boot.sh"]
