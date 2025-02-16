# syntax=docker/dockerfile:1.7-labs
FROM node:16-alpine
RUN mkdir -p /demo/file-upload/backend
WORKDIR /demo/file-upload/backend
# 先拷贝package.json进行install， 目的是充分利用层缓存，只要package不变动， 这一层就会直接使用缓存
COPY package.json package-lock.json /demo/file-upload/backend/
RUN npm install
COPY . /demo/file-upload/backend/
EXPOSE 3000
RUN npm run serve

