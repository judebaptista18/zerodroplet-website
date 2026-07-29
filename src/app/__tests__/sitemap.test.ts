import sitemap from '@/app/sitemap';
import {services} from '@/lib/content';

describe('sitemap', () => {
  it('contains the home page, contact page and every service page', () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain('https://zerodroplet.com');
    expect(urls).toContain('https://zerodroplet.com/contact');

    for (const service of services) {
      expect(urls).toContain(`https://zerodroplet.com/services/${service.slug}`);
    }

    expect(entries).toHaveLength(services.length + 2);
  });
});
