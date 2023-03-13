/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.gravatar.com",
      "localhost",
      "ec2-52-91-153-172.compute-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
