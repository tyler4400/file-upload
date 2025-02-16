# syntax=docker/dockerfile:1.7-labs
FROM node:16-alpine
RUN mkdir -p /demo/file-upload/frontend
WORKDIR /demo/file-upload/frontend
# 先拷贝package.json进行install， 目的是充分利用层缓存，只要package不变动， 这一层就会直接使用缓存
COPY package.json package-lock.json /demo/file-upload/frontend/
RUN npm install
COPY --exclude=server . /demo/file-upload/frontend/
EXPOSE 8080
CMD npm run prod

