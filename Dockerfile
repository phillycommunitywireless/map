FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install dependencies
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install --silent

# copy app files
COPY . .

# start app
CMD ["npm", "start"]
