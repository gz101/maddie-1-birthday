FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# not used in production
# EXPOSE 3000
# CMD ["npm", "run", "watch"]

CMD ["npm", "run"]
