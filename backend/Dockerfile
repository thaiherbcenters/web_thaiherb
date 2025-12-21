# Backend Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Start server
CMD ["node", "server.js"]
