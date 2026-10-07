import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Images du flux Facebook (sous-domaines multiples, ex. scontent.xx.fbcdn.net)
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: '**.facebook.com',
      },
    ],
  },
  async redirects() {
    // Anciens slugs accentués (404) → slugs ASCII
    const renamedRealisations = [
      ["remplacement-tuiles-cassées-orage-venissieux", "remplacement-tuiles-cassees-orage-venissieux"],
      ["creation-verrière-toit-lyon-3", "creation-verriere-toit-lyon-3"],
    ];
    return renamedRealisations.flatMap(([oldSlug, newSlug]) => {
      const destination = `/realisations/${newSlug}`;
      const encoded = encodeURIComponent(oldSlug);
      const decomposed = encodeURIComponent(oldSlug.normalize("NFD"));
      return Array.from(new Set([encoded, decomposed])).map((slug) => ({
        source: `/realisations/${slug}`,
        destination,
        permanent: true,
      }));
    });
  },
};

export default nextConfig;
