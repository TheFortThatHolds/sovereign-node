# Use a lean and stable Node.js version as the base for your Fort
FROM node:20-alpine

# Set the working directory inside the container (your digital box)
WORKDIR /app

# Copy package.json and install dependencies FIRST
# This is an optimization for Docker builds
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy the rest of your application code into the container
COPY . .

# Expose the port your Node.js app runs on
# Your server.js runs on process.env.PORT || 3000, so 3000 is the default here
EXPOSE 3000

# Define the command to run your app when the container starts
CMD ["npm", "start"]
