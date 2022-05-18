FROM node:alpine  as front-end

WORKDIR /app

COPY . .
RUN npm ci && npm run build


# Stage 2: Serve app with nginx server
FROM nginx:alpine 

# Copy the build output to replace the default nginx contents.
COPY --from=front-end /app/dist/front-end /usr/share/nginx/html

# Expose port 80
EXPOSE 80