FROM node:16.13.1
USER root
WORKDIR /app/frontend
ENV TZ=Asia/Seoul

EXPOSE 3000

COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
RUN yarn global add serve
CMD serve -s dist -l 3000