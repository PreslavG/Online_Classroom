# Use official Node.js LTS image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port (Cloud Run uses PORT env variable)
EXPOSE 8080

# Start the app using a static server
CMD ["npx", "serve", "-s", "dist", "-l", "8080"]
