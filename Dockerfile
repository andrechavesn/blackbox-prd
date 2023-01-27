FROM node:16-alpine as BUILD
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# COPY package.json .
# RUN yarn install
# COPY . .
# RUN yarn run build

# FROM node:16-alpine
# COPY --from=BUILD /app/dist /app
# RUN npm install serve -g
# EXPOSE 8080
# CMD [ "serve", "-s", "app", "-l", "8080" ]