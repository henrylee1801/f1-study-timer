import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({});

// Set to "/<repo-name>" when hosting under a GitHub Pages project site
// (e.g. https://<user>.github.io/<repo-name>/). Left empty for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
