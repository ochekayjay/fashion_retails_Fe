/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['igoche-fashion-db.s3.us-east-2.amazonaws.com'],
    unoptimized: true
  }
}

module.exports = nextConfig
