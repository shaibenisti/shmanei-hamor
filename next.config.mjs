/** @type {import('next').NextConfig} */

// On GitHub Pages a *project* site is served from /<repo-name>/.
// In CI we set NEXT_PUBLIC_BASE_PATH=/shmanei-hamor so all asset and route
// paths resolve correctly. Locally it stays empty so `npm run dev` works at /.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  // Explicitly inline the base path so app code (asset()) can prefix
  // `next/image` sources, which Next does not prefix automatically under
  // `output: export` + `unoptimized`.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
