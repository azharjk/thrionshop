FROM node:16

WORKDIR /app
COPY . /app

# ENV THRION_PRODUCTS_HOST=http://192.168.1.22
# ENV THRION_PRODUCTS_PORT=8000

RUN npm install

EXPOSE 3000
CMD ["yarn", "run", "dev"]
