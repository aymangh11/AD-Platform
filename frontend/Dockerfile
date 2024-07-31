# Use a base image
FROM node:16

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the application code
COPY . /app

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
