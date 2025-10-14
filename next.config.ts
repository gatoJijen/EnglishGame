import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',  // Incluye http
        hostname: '**',    // Permite cualquier hostname
        port: '',          // Sin puerto específico
        pathname: '/**',   // Permite cualquier path
      },
      {
        protocol: 'https', // Incluye https
        hostname: '**',    // Permite cualquier hostname
        port: '',          // Sin puerto específico
        pathname: '/**',   // Permite cualquier path
      },
    ]
  }
};

export default nextConfig;
