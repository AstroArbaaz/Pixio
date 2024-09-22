# Use an official Node.js 20.17 Alpine 3.19 image as the base
FROM node:20.17-alpine:3.19

# Set the working directory in the container
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Copy the .env file to the working directory
COPY .env .

# Prisma: Migrate Database
# RUN npx prisma migrate dev

# Install TypeScript and build the application
RUN npm run build

# Expose the port the application will run on
EXPOSE 3000

# Run the command to start the application when the container launches
CMD ["npm", "start"]