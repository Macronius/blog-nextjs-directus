/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "directus-production-5790.up.railway.app"
      }
    ],
  }
};

// export default nextConfig;
module.exports = nextConfig;
