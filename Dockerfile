FROM alpine

RUN apk add --update npm

WORKDIR /app

COPY package.json package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "i", "-g" "npx"]
CMD ["npx", "prisma", "generate"]
CMD ["npx", "prisma", "db", "push"]
CMD ["npx", "prisma", "db", "seed", "--preview-feature"]
CMD ["npm", "run", "start:prod"]
