/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed i18n from next.config.js as it conflicts with app directory
  // i18n is now handled through middleware and app directory structure
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
