function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const apiVersion = required(
  'NEXT_PUBLIC_SANITY_API_VERSION',
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
);

export const dataset = required(
  'NEXT_PUBLIC_SANITY_DATASET',
  process.env.NEXT_PUBLIC_SANITY_DATASET,
);

export const projectId = required(
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
);

export const sanityConfigured = process.env.NODE_ENV !== 'test';
