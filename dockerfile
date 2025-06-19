# Use a lightweight Node.js runtime as the base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker's caching
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies) for building the app
RUN npm install --legacy-peer-deps

# Check if TypeScript is installed (for debugging purposes)
RUN npm list typescript

ARG REACT_APP_GEMINI_API_KEY

ENV REACT_APP_GEMINI_API_KEY=$REACT_APP_GEMINI_API_KEY

# Copy the rest of the application code
COPY . ./

# Build the application to minimize runtime dependencies
RUN npm run build

# Use a lightweight server to serve the build files
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port your app runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
