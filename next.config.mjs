/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      "classapi.sepehracademy.ir",
      "sepehracademy.liara.run",
      "tahacode.ir",
      "cdn.donya-e-eqtesad.com",
      "cdn.thenackstack.io",
      "vmtw.in",
      "www.vmtw.in",
      "miro.medium.com",
      "www.mckinsey.com",
      "www.etatvasoft.com",
    ],
  },
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === "production" ? "/power" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/power/" : "",
};

export default nextConfig;
