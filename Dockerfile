FROM node:20-bullseye-slim

WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Fix SSL issues and upgrade npm
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm install -g npm@11.6.1

# Install dependencies
RUN npm install --omit=dev

# Copy rest of the code
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
