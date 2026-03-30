# Step 1: Start with official Node.js image (lightweight alpine version)
FROM node:20-alpine

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package files first (so npm install is cached if code doesn't change)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy rest of the backend code
COPY . .

# Step 6: Tell Docker this container uses port 5000
EXPOSE 5000

# Step 7: Command to start the server
CMD ["node", "server.js"]