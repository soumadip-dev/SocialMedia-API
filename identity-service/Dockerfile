# Use the official Node.js 18 image with Alpine Linux as the base image
FROM node:18-alpine

# Create and set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies including dev dependencies for TypeScript compilation
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port
EXPOSE 8081

# Start the application
CMD [ "node", "--env-file=.env", "dist/src/server.js" ]