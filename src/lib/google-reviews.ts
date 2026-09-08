import {z} from 'zod';

const httpsUrl = z.string().url().refine((value) => value.startsWith('https://'));
const localizedText = z.object({text: z.string(), languageCode: z.string().optional()});

// Validate upstream content before exposing it to the UI, including link schemes.
export const googlePlaceReviewsSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  userRatingCount: z.number().int().nonnegative().optional(),
  googleMapsUri: httpsUrl.optional(),
  reviews: z.array(z.object({
    name: z.string(),
    rating: z.number().min(1).max(5),
    text: localizedText.optional(),
    originalText: localizedText.optional(),
    relativePublishTimeDescription: z.string().optional(),
    googleMapsUri: httpsUrl.optional(),
    authorAttribution: z.object({displayName: z.string(), uri: httpsUrl.optional(), photoUri: httpsUrl.optional()}),
  })).default([]),
  attributions: z.array(z.object({provider: z.string(), providerUri: httpsUrl.optional()})).default([]),
});

export type GoogleReviewsData = z.infer<typeof googlePlaceReviewsSchema> & {
  writeReviewUrl?: string;
};
