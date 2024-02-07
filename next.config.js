/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.shareicon.net",
      },
      {
        protocol: "https",
        hostname: "aem.dropbox.com",
      },
    ],
  },
};

module.exports = nextConfig;
