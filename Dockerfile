FROM buildkite/puppeteer:8.0.0

# ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=${PUPPETEER_SKIP_CHROMIUM_DOWNLOAD:-"false"}
# ARG PUPPETEER_EXECUTABLE_PATH=/node_modules/puppeteer/.local-chromium/linux-782078/chrome-linux/chrome

# RUN apk update && \
#     apk upgrade && \
#     apk add --no-cache git

WORKDIR /app
COPY . .
# COPY package.json ./

# RUN adduser -D node -h /app -s /bin/sh && \
    # su node -c 'cd /app; mkdir -p config data/reports'

RUN chown -R node:node /app
USER node

RUN npm install
# RUN npm install -g site-audit-seo --unsafe-perm=true && \
    # chown -R "$(id -u):$(id -g)" "$(npm prefix -g)/lib/node_modules/site-audit-seo/node_modules/puppeteer/.local-chromium/"
# RUN chown -R "$(id -u):$(id -g)" "/app/node_modules/puppeteer/.local-chromium/"

VOLUME ["/app/data/reports"]
EXPOSE 5301
ENV PORT=5301

CMD  ["npm", "run", "server"]
# CMD  ["ls", "-l", "/app"]
