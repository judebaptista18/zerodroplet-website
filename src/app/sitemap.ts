import type {MetadataRoute} from 'next';
import {siteConfig} from '@/lib/site-config';
import {getServices} from '@/sanity/lib/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.siteUrl}/services/${service.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
