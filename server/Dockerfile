FROM node:18-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy server source
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
