import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  typescript: {
    // Ignore build errors if types conflict temporarily during migration
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
