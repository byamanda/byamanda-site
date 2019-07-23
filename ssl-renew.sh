#!/bin/bash

/usr/local/bin/docker-compose -f /home/josh/byamanda-site/docker-compose.yml run certbot renew --dry-run
&& /usr/local/bin/docker-compose -f /home/josh/byamanda-site/docker-compose.yml kill -s SIGHUP reverseproxy
