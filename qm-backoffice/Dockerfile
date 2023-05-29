FROM node:10-alpine AS build
WORKDIR /app

COPY . ./
RUN npm install
RUN npm run buildp 
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist/dashboard /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
