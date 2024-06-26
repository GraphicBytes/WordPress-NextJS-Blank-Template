/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,  
  trailingSlash: false,
    i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ['nextjs-template.api-domain.com'],
    formats: ['image/webp']
  },
}
 
module.exports = nextConfig   


