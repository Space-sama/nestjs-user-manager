############# Development Mode #############
# Version of NodeJs 
FROM node:14 AS development

# Container work directory
WORKDIR /oussama/src/app

# copying package-lock & package from the local machine to the container
COPY package*.json ./

# installing dependencies inside the container with building on vscode
RUN npm install 

RUN npm run build 

EXPOSE  7070

COPY . .

############# Production Mode #############

FROM node:14 AS production

ENV NODE_ENV=production

# Setting the work directory
WORKDIR /oussama/src/app

COPY --from=development /oussama/src/app/ .

EXPOSE 7070

# running the application
CMD [ "node", "start"]

