require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    thrionProductsHost: process.env.THRION_PRODUCTS_HOST,
    thrionProductsPort: process.env.THRION_PRODUCTS_PORT
  }
}

module.exports = nextConfig
