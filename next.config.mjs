/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static files only, so the site can be served by GitHub Pages.
  output: 'export',
  trailingSlash: true,
  // GitHub Pages serves the site from /<repo>; the Pages workflow sets this at build time.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
