FROM alpine

# Add npm & nodejs to image
RUN apk add --update nodejs yarn

ENV TZ Europe/Paris

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Use CMD to run the node server.js command that will start your application
CMD [ "node", "index.js" ]