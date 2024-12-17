sudo apt update
sudo apt upgrade -y

sudo apt install nginx

sudo snap install --classic certbot
sudo certbot --nginx

sudo apt install unzip

curl -fsSL https://bun.sh/install | bash

source /root/.bashrc

bun add pm2 --global

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

source /root/.bashrc

nvm install node

sudo apt remove nginx -y

bun install
bun run build
pm2 start server.mjs --name meta-lang.com
pm2 save
pm2 startup