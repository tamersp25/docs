FROM node:10 as builder
ENV APPLICATION=docs
ARG ENVIRONMENT
ARG GITHUB_ACCESS_TOKEN
WORKDIR /app
ADD . .

# From https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
# See https://crbug.com/795759
RUN echo '### apt-get update1...' && apt-get update
RUN echo '### apt-get install libgconf-2-4...' && apt-get install -yq libgconf-2-4

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN echo '### apt-get install wget...' && apt-get install -y wget --no-install-recommends
RUN echo '### download chrome...' && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

RUN echo '### get google signing key...' && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

RUN echo '### apt-get update...' && apt-get update


RUN echo '### install chrome...' && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont --no-install-recommends
RUN echo '### remove file lists...' && rm -rf /var/lib/apt/lists/*
RUN echo '### apt-get purge...' && apt-get purge --auto-remove -y
RUN echo '### remove file deb...' && rm -rf /src/*.deb

#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN echo '### /app/buildinfo.sh...' && /app/buildinfo.sh

RUN echo '### install jq...' && apt-get update && apt-get -y install jq

RUN echo '### apt-get install cert...' && apt-get install -y ca-certificates
RUN git config --global url."https://${GITHUB_ACCESS_TOKEN}:x-oauth-basic@github.com/".insteadOf "https://github.com/"
RUN mkdir -p /app && \
    ls -a && \
    chmod +x /app/*.sh && \
    ./getconfig.sh

RUN echo '### yarn...' && yarn
RUN echo '### yarn build...' && yarn build
#RUN echo '### yarn test...' && yarn test

FROM nginx:1.15-alpine
ENV NGINX_PORT=9000
ARG ENVIRONMENT
RUN echo '### Starting COPY from builder...'
COPY --from=builder "/app/build-${ENVIRONMENT}" /usr/share/nginx/html
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
