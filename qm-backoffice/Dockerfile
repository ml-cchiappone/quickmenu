FROM node:10-alpine AS build
RUN mkdir -p /home/angular/app && chown -R node:node /home/angular/app

WORKDIR /home/angular/app

# Copia el código fuente
COPY . ./

# Instala las dependencias y realiza la compilación
RUN npm install
RUN npm run buildp 

# Instala gettext-base para tener acceso a envsubst
RUN apk update && apk add gettext

# Copia el archivo de plantilla env.template.js al directorio de trabajo del contenedor
COPY env.js /home/angular/app/env.template.js

# Utiliza envsubst para reemplazar los marcadores de posición en el archivo de plantilla
RUN echo "Contenido de env.template.js:" && cat /home/angular/app/env.template.js \
    && echo "Ejecutando envsubst..." \
    && envsubst < /home/angular/app/env.template.js > /home/angular/app/env.js

# Ahora continúa con el resto de tu Dockerfile
FROM nginx:1.16.0-alpine

# Copia los archivos generados por la etapa de construcción
COPY --from=build /home/angular/app/dist/qm-backoffice /usr/share/nginx/html
COPY --from=build /home/angular/app/nginx.conf /etc/nginx/conf.d/default.conf

# Copia el archivo env.js generado por envsubst
COPY --from=build /home/angular/app/env.js /usr/share/nginx/html/assets/env.js

# Exponer el puerto 80
EXPOSE 80

# CMD para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
