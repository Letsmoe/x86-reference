#!/usr/bin/bash

bun install
bun run build

# Restart the pm2 server
pm2 stop meta-lang.com
pm2 delete meta-lang.com
pm2 start server.mjs --name meta-lang.com