/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  // Render-specific optimizations
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  }
};

export default nextConfig;
