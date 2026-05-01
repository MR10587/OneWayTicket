FROM node:20-alpine
WORKDIR /app

# Build argument for API URL - defaults to Railway backend
ARG VITE_API_URL=https://onewayticket-production-aea8.up.railway.app
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
