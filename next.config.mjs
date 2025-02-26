/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "export", // Outputs a Single-Page Application (SPA).
   distDir: "./dist", // Changes the build output directory to `./dist/`.
   eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/,
         use: ["@svgr/webpack"],
      });

      return config;
   },
};

export default nextConfig;
