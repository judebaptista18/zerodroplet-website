import sitemap from '@/app/sitemap';
import {services} from '@/lib/content';
import {siteConfig} from '@/lib/site-config';

jest.mock('@/sanity/lib/services', () => ({
  getServices: async () =>
    jest.requireActual<typeof import('@/lib/content')>('@/lib/content').services,
}));

describe('sitemap', () => {
  it('contains the home page, contact page and every service page', async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain(siteConfig.siteUrl);
    expect(urls).toContain(`${siteConfig.siteUrl}/contact`);

    for (const service of services) {
      expect(urls).toContain(`${siteConfig.siteUrl}/services/${service.slug}`);
    }

    expect(entries).toHaveLength(services.length + 2);
  });
});
