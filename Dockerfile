FROM node:16.18.0

# Install Nano
RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "nano"]

# App Directory
WORKDIR /srv/TaskWand

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose to Port
EXPOSE 3094

# Start the app
CMD [ "node", "app.js" ]