FROM node:18-alpine

WORKDIR /app

# EXPOSE is merely a hint that a certain ports are useful
EXPOSE 8080

# Setting default shell to sh
RUN npm config set shell sh

# Copy json files to prepare the docker container
COPY ./package*.json /app/

# Install dependencies
RUN npm install

# Copy .bin files so it can run npm command
RUN cp /app/node_modules/.bin/* /usr/local/bin/

# Copy project to container
COPY . /app

# Start the node dev server
CMD [ "./run.sh" ]
