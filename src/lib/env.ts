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
  facebookUrl: required(
    'NEXT_PUBLIC_FACEBOOK_URL',
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
  ),
  instagramUrl: required(
    'NEXT_PUBLIC_INSTAGRAM_URL',
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  ),
  linkedinUrl: required(
    'NEXT_PUBLIC_LINKEDIN_URL',
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
  ),
  whatsappUrl: required(
    'NEXT_PUBLIC_WHATSAPP_URL',
    process.env.NEXT_PUBLIC_WHATSAPP_URL,
  ),
  officeAddress: required(
    'NEXT_PUBLIC_OFFICE_ADDRESS',
    process.env.NEXT_PUBLIC_OFFICE_ADDRESS,
  ),
  googleMapsEmbedUrl: required(
    'NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL',
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL,
  ),
  googleMapsDirectionsUrl: required(
    'NEXT_PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL',
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL,
  ),
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  yotpoAppKey: process.env.NEXT_PUBLIC_YOTPO_APP_KEY,
} as const;
