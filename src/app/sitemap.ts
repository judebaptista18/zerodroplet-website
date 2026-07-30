import type {MetadataRoute} from 'next';
import {publicEnv} from '@/lib/env';
import {getServices} from '@/sanity/lib/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: publicEnv.siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${publicEnv.siteUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${publicEnv.siteUrl}/services/${service.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
