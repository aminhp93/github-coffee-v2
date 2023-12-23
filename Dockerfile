FROM node:20 as builder
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
RUN yarn export

FROM nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]