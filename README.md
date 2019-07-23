# By Amanda Web Services # 

## Install ##
Clone the repo in the root of your home directory and run `sudo docker-compose up -d`
This will not work the first time if you have not set up SSL properly (see below).

## Diffie-Hellman Params ##
```bash
mkdir ./dhparam
sudo openssl dhparam -out /home/path/to/project/dhparam/dhparam-2048.pem 2048
```

... then wait a long time

## How to initialize SSL ##
The repo is currently setup to assume that you have received letsencrypt certs. The certbot 
container is configured to request certs but if the certs do not exist then nginx will not 
start (causing a "chicken and egg" problem). To get around this just comment out the server
block in `./reverseproxy/nginx.conf`. Also, you're going to want to comment out the rewrite 
URI command and just pass it to one of the services such as `http://florals:80`.

Run `sudo docker-compose up -d` to get nginx to start and certbot to get the certificates. 
The big reason this isn't going to work by just allowing certbot to request the certs is that
it needs nginx to respond to the `/.well-known/` path to verify the domain.

Once you have the containers up and running go ahead and change the `--staging` flag to 
`--force-renewal` in the certbot part of the docker-compose file and 
run `sudo docker-compose up --force-recreate --no-deps certbot`. This should spin up the 
container and then take it right back down with a renewal.

You should now be able to uncomment the SSL portions of `./reverseproxy/nginx.conf` and see
that the site us running with the HTTPS lock in the browser.

## Auto Update Certs ## 
Give your `ssl-renew.sh` file permission to be executed with `chmod +x ssl-renew.sh` and make 
sure that the path to the `docker-compose.yml` file is properly configured. 

Run `sudo crontab -e` to set a crontab with:

```bash
  0 12 * * * /path/to/ssl-renew.sh >> /var/log/crontab.log 2>&1
```