FROM buildkite/puppeteer:latest
# ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=${PUPPETEER_SKIP_CHROMIUM_DOWNLOAD:-"false"}

RUN apt-get update  && \
	apt-get install -y --no-install-recommends git ca-certificates python3 python3-pip make cmake

WORKDIR /app
COPY package.json ./

# RUN adduser --disabled-password node --home /app --shell /bin/sh && \
RUN mkdir -p config data/reports data/output

RUN chown -R node:node /app
USER node

RUN yarn install

COPY . .

# RUN npm install -g site-audit-seo --unsafe-perm=true && \
    # chown -R "$(id -u):$(id -g)" "$(npm prefix -g)/lib/node_modules/site-audit-seo/node_modules/puppeteer/.local-chromium/"
# RUN chown -R "$(id -u):$(id -g)" "/app/node_modules/puppeteer/.local-chromium/"

VOLUME ["/app/data/reports"]
EXPOSE 5301
ENV PORT=5301

CMD  ["npm", "run", "server"]
# CMD  ["ls", "-l", "/app"]
