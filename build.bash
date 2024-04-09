#!/usr/bin/bash

bun install
bun run build

# Update crontab 
echo $(cat ./crontab) | crontab -

# Restart cron
sudo service cron restart

# Restart the pm2 server
SERVER_KEY_PATH=/etc/letsencrypt/live/meta-lang.com/privkey.pem
SERVER_CERT_PATH=/etc/letsencrypt/live/meta-lang.com/cert.pem
PORT=80
pm2 stop meta-lang.com
pm2 delete meta-lang.com
pm2 start ./dist/server/entry.mjs --name meta-lang.com -- --port $PORT --key $SERVER_KEY_PATH --cert $SERVER_CERT_PATH
