import {defineQuery} from 'next-sanity';
import {
  fallbackHomePage,
  type HomePageContent,
} from '@/lib/home-content';
import {sanityConfigured} from '../env';
import {client} from './client';

const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "homePage" && _id == "homePage"][0] {
    servicesSection {
      eyebrow,
      heading,
      introduction,
      services[]-> {
        "id": _id,
        title,
        "slug": slug.current,
        summary,
        "items": coalesce(capabilities, []),
        seoTitle,
        seoDescription
      }
    },
    about {
      eyebrow,
      heading,
      body,
      processSteps[] {
        _key,
        title,
        description
      }
    },
    clientShowcase {
      eyebrow,
      heading,
      introduction,
      clients[] {
        _key,
        name,
        "imageUrl": logo.asset->url,
        "alt": coalesce(logo.alt, name),
        website
      }
    },
    distributorship {
      eyebrow,
      heading,
      introduction,
      partners[] {
        _key,
        name,
        "imageUrl": logo.asset->url,
        "alt": coalesce(logo.alt, name),
        offerings,
        website
      }
    }
  }
`);

export async function getHomePage(): Promise<HomePageContent> {
  if (!sanityConfigured) return fallbackHomePage;

  try {
    const result = await client.fetch<HomePageContent | null>(
      HOME_PAGE_QUERY,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['homePage'],
        },
      },
    );

    if (!result?.servicesSection?.services?.length) return fallbackHomePage;

    return result;
  } catch {
    console.warn('Sanity home page content is unavailable; using local fallback content.');
    return fallbackHomePage;
  }
}
