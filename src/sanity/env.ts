function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const apiVersion = required(
  'SANITY_STUDIO_API_VERSION',
  process.env.SANITY_STUDIO_API_VERSION,
);

export const dataset = required(
  'SANITY_STUDIO_DATASET',
  process.env.SANITY_STUDIO_DATASET,
);

export const projectId = required(
  'SANITY_STUDIO_PROJECT_ID',
  process.env.SANITY_STUDIO_PROJECT_ID,
);

export const sanityConfigured = process.env.NODE_ENV !== 'test';
