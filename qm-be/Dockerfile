# stage-0: based on nodejs, to build and compile the frontend
FROM node:14

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

#RUN mkdir /app && chown node:node /app
COPY package*.json ./
#USER node
RUN npm install
RUN npm i bcrypt

#COPY --chown=node:node . /app
COPY . ./

EXPOSE 8080

CMD ["npm", "start"]
