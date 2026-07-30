import sitemap from '@/app/sitemap';
import {services} from '@/lib/content';

jest.mock('@/sanity/lib/services', () => ({
  getServices: async () =>
    jest.requireActual<typeof import('@/lib/content')>('@/lib/content').services,
}));

describe('sitemap', () => {
  it('contains the home page, contact page and every service page', async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain('https://zerodroplet.com');
    expect(urls).toContain('https://zerodroplet.com/contact');

    for (const service of services) {
      expect(urls).toContain(`https://zerodroplet.com/services/${service.slug}`);
    }

    expect(entries).toHaveLength(services.length + 2);
  });
});
