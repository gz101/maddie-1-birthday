FROM --platform=linux/amd64 node:14.17.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# not used in production
# EXPOSE 3000

CMD ["npm", "run", "watch"]
