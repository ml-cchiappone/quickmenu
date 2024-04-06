FROM node:10-alpine AS build
WORKDIR /app

COPY . ./
RUN npm install
RUN npm run build
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist/qm-fe-app /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
