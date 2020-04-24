FROM node:12

ARG PORT=8080
ENV PORT=${PORT}

RUN apt-get update && apt-get install -y \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \ 
    libnss3 \
    lsb-release \
    xdg-utils \ 
    wget


RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

COPY wordpress-cloud-run-owner-key.json /home/node/app/keys/wordpress-cloud-run-owner-key.json

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install --only=production && npm cache clean --force --loglevel=error

COPY --chown=node:node . ./

CMD [ "node", "./bin/www"]