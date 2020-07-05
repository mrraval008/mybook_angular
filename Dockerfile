# Stage 0, "build-stage", based on Node.js, to build and compile Angular
# FROM node:11.15.0-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run ng build -- --prod --output-path=./dist/out 
# # RUN npm run build --prod --output-path=./dist/out 
# #to run in prod mode 

# # Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM nginx:1.16.0-alpine as prod-stage
# COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build-stage /app/dist/out /usr/share/nginx/html
### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run ng build -- --prod --output-path=dist


### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html
#EXPOSE 8080
#CMD ["nginx", "-g" , "daemon off;"]
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'