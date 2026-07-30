function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const publicEnv = {
  siteUrl: required('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL).replace(
    /\/$/,
    '',
  ),
  contactEmail: required(
    'NEXT_PUBLIC_CONTACT_EMAIL',
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  ),
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  yotpoAppKey: process.env.NEXT_PUBLIC_YOTPO_APP_KEY,
} as const;
