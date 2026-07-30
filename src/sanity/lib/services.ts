import {defineQuery} from 'next-sanity';
import {services as fallbackServices, type Service} from '@/lib/content';
import {sanityConfigured} from '../env';
import {client} from './client';

const SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && defined(slug.current)]
  | order(order asc, title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    summary,
    "items": coalesce(capabilities, []),
    seoTitle,
    seoDescription
  }
`);

const SERVICE_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    summary,
    "items": coalesce(capabilities, []),
    seoTitle,
    seoDescription
  }
`);

let hasLoggedFallback = false;

async function fetchFromSanity<T>(
  query: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  if (!sanityConfigured) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: {revalidate: 3600, tags: ['service']},
    });
  } catch {
    if (!hasLoggedFallback) {
      console.warn('Sanity content is unavailable; using local fallback content.');
      hasLoggedFallback = true;
    }
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  const result = await fetchFromSanity<Service[]>(SERVICES_QUERY);
  return result?.length ? result : fallbackServices;
}

export async function getService(slug: string): Promise<Service | undefined> {
  const result = await fetchFromSanity<Service>(SERVICE_QUERY, {slug});
  return result || fallbackServices.find((service) => service.slug === slug);
}
