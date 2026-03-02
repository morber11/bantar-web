FROM node:18-alpine AS build
WORKDIR /app

ARG VITE_API_URL
ARG VITE_APP_ENV

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_ENV=$VITE_APP_ENV

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# production image
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# expose port that nginx will listen on
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
