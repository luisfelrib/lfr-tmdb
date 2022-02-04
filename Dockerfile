# --------------> The build image
FROM node:latest AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci --only=production

# --------------> The production image
FROM node:alpine
RUN apk add dumb-init
ENV NODE_ENV production
EXPOSE 5000
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app
CMD ["dumb-init", "node", "server.js"]