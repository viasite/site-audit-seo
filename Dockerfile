FROM mhart/alpine-node:12

# ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=${PUPPETEER_SKIP_CHROMIUM_DOWNLOAD:-"false"}

RUN apk update && \ 
    apk upgrade && \
    apk add --no-cache git

WORKDIR /app

RUN adduser -D node -h /app -s /bin/sh && \
    su node -c 'cd /app; mkdir -p config outputs'

USER node

RUN npm install -g site-audit-seo --unsafe-perm=true && \
    chown -R $USER:$USER "$(npm prefix -g)/lib/node_modules/site-audit-seo/node_modules/puppeteer/.local-chromium/"

VOLUME ["/app/outputs"]
EXPOSE 3000

CMD  ["npm", "run", "server"]
