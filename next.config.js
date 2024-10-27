/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "uijjfslwyuylxchlehlc.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
