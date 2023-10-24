FROM node:18.12.1 as build-stage
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build


# production stage
FROM nginx:1.17-alpine as production-stage
# Copy config nginx
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/nginx/.htpasswd /etc/nginx/.htpasswd
# Remove default nginx static assets
COPY --from=build-stage /app/dist/. /usr/share/nginx/html/
# Clean up after build
RUN rm -rf /app/node_modules
CMD ["nginx", "-g", "daemon off;"]