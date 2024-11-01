import fs from 'fs-extra';
import path from 'path';

// Validate env
// eslint-disable-next-line no-restricted-imports
import './src/env.mjs';

// Strengthen security with security headers
// https://nextjs.org/docs/advanced-features/security-headers#content-security-policy
const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'self';",
  },
];

const getTranspilePackages = () => {
  const packageJson = fs.readJSONSync(path.resolve('package.json'));
  return [
    ...Object.keys(packageJson.dependencies).filter((dep) =>
      dep.startsWith('@purplefish'),
    ),
    ...Object.keys(packageJson.devDependencies).filter((dep) =>
      dep.startsWith('@purplefish'),
    ),
  ];
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  transpilePackages: getTranspilePackages(),
  headers: async () => {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

// eslint-disable-next-line import/no-default-export
export default nextConfig;
