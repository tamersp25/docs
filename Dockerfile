FROM node:8 as builder
ENV APPLICATION=docs
ARG ENVIRONMENT
ARG GITHUB_ACCESS_TOKEN
WORKDIR /app
ADD . .
RUN apt-get update && apt-get install -y ca-certificates jq && \
    git config --global url."https://${GITHUB_ACCESS_TOKEN}:x-oauth-basic@github.com/".insteadOf "https://github.com/" && \
    mkdir -p /app && \
    ls -a && \
    chmod +x /app/*.sh && \
    ./getconfig.sh && \
    yarn && \
    yarn build

FROM nginx:1.15-alpine
ENV NGINX_PORT=9000
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
