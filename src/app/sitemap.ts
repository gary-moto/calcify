import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calcify.io';
  
  const calculators = [
    '',
    '/age-calculator',
    '/pregnancy-calculator',
    '/percentage-calculator',
    '/date-calculator',
    '/tip-calculator',
    '/privacy-policy',
    '/terms',
  ];

  return calculators.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
