#!/bin/bash 

export NGINX_CONF=/etc/nginx/nginx.conf 

cat <<EOF > $NGINX_CONF
events {
  worker_connections 1024;
}

http {
  include mime.types;
  
  gzip on;
  gzip_min_length 1000;
  gzip_buffers 4 32k;
  gzip_proxied any;
  gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;
  gzip_vary on;
  
  server {
    listen 80;

    root /usr/service/public;
    index index.html


    error_page 404 /404.html;

    location ~*\.html {
      add_header Cache-Control "no-store";
      expires off;
    }

    location ~*\.(?:css|js|eot|wof|woff2|ttf|svg|otf) {
      gzip_static on;
      add_header Cache-Control "public";
      expires max;
    }

    try_files \$uri \$uri/ \$uri/index.html =404;
  }
}
EOF

echo "Starting nginx..."
nginx -c '/etc/nginx/nginx.conf' -g 'daemon off;'