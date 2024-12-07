/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "classapi.sepehracademy.ir",
      "tahacode.ir",
      "cdn.donya-e-eqtesad.com",
      "cdn.thenewstack.io",
      "vmtw.in",
      "www.vmtw.in",
      "miro.medium.com",
      "miro.medium",
      "www.mckinsey.com"
    ],
  },
  css: ["./app/global.css"],
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;
