/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/files/**',
      },
      // سایر دامنه‌ها
      {
        protocol: 'https',
        hostname: 'classapi.sepehracademy.ir',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sepehracademy.liara.run',
        pathname: '/files/**',
      },
      // بقیه دامنه‌ها...
    ],
    domains: [
      "classapi.sepehracademy.ir",
      "sepehracademy.liara.run",
      "tahacode.ir",
      "cdn.donya-e-eqtesad.com",
      "cdn.thenewstack.io",
      "vmtw.in",
      "www.vmtw.in",
      "miro.medium.com",
      "www.mckinsey.com",
      "www.etatvasoft.com"
    ],
  },
  css: ["./app/global.css"],
  reactStrictMode: true,
  // rewrites رو حذف کنید چون با خروجی استاتیک کار نمی‌کنه
  basePath: process.env.NODE_ENV === 'production' ? '/power' : '', // اگر ریپازیتوری شما power نام دارد
  assetPrefix: process.env.NODE_ENV === 'production' ? '/power/' : '',
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