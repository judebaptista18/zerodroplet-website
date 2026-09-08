import {NextResponse} from 'next/server';
import {googlePlaceReviewsSchema} from '@/lib/google-reviews';

export const dynamic = 'force-dynamic';
const headers = {'Cache-Control': 'private, no-store'};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) {
    return NextResponse.json({available: false}, {headers});
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews,attributions',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Places request failed');
    const place = googlePlaceReviewsSchema.parse(await response.json());
    return NextResponse.json({
      available: true,
      ...place,
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
    }, {headers});
  } catch {
    console.error('Google reviews could not be loaded');
    return NextResponse.json({available: false}, {status: 502, headers});
  }
}
