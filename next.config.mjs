/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    minimumCacheTTL: 31536000,
  },
}

export default nextConfig
