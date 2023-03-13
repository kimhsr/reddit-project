/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.gravatar.com",
      "localhost",
      "ec2-54-160-110-19.compute-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
