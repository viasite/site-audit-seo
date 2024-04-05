FROM node:18-slim

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libx11-xcb1 \
    libxtst6 \
    && rm -rf /var/lib/apt/lists/*

ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=${PUPPETEER_SKIP_CHROMIUM_DOWNLOAD:-"true"}
# ARG PUPPETEER_EXECUTABLE_PATH=/node_modules/puppeteer/.local-chromium/linux-782078/chrome-linux/chrome

# RUN apk update && \
#     apk upgrade && \
#     apk add --no-cache git

RUN mkdir /app
WORKDIR /app
COPY package*.json ./

# RUN adduser -D node -h /app -s /bin/sh && \
    # su node -c 'cd /app; mkdir -p config data/reports'

RUN chown -R node:node /app
USER node

RUN npm install --omit=dev
COPY . .
# RUN npm install -g site-audit-seo --unsafe-perm=true && \
    # chown -R "$(id -u):$(id -g)" "$(npm prefix -g)/lib/node_modules/site-audit-seo/node_modules/puppeteer/.local-chromium/"
# RUN chown -R "$(id -u):$(id -g)" "/app/node_modules/puppeteer/.local-chromium/"

# VOLUME ["/app/data/reports"]
EXPOSE 5301
ENV PORT=5301
ENV NODE_ENV production
ENV PUPPETEER_EXECUTABLE_PATH=/opt/google/chrome/chrome
ENV CHROME_PATH=/opt/google/chrome/chrome

CMD  ["npm", "run", "server"]
# CMD  ["ls", "-l", "/app"]
