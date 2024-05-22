/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       fs: false,
  //       path: false,
  //       os: false,
  //       crypto: false,
  //       stream: false,
  //       http: false,
  //       https: false,
  //       zlib: false,
  //     };
  //   }

  //   return config;
  // },
};


export default nextConfig;
