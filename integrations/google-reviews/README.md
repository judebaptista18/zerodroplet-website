# Google reviews

The home page's custom review section replaces the former third-party widget.
It displays the Google rating and review count, review cards, author attribution,
and links to Google Maps. Review content loads when the section approaches the
viewport. Without credentials, or when Google is unavailable, it shows an
invitation to visit the business profile without fabricated reviews or ratings.

## Configuration

Add `GOOGLE_PLACES_API_KEY` to your server environment (`.env.local` locally).
Never prefix the API key with `NEXT_PUBLIC_`.

Set the non-secret values in `src/lib/site-config.ts`:

- `googlePlaceId`: business Place ID.
- `googleReviewsUrl`: optional public profile/reviews link.
- `googleWriteReviewUrl`: optional direct write-review link.

Redeploy after changing configuration. On Amplify, the API key must be available
to the server runtime as well as the build environment.

1. Enable **Places API (New)** in a Google Cloud project with billing enabled.
2. Create a server API key restricted to Places API (New). Apply server IP
   restrictions if your hosting has fixed outbound IPs. Set API quotas and billing
   alerts appropriate for your website traffic.
3. Find the business's [Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id)
   and set `siteConfig.googlePlaceId` (the ID only, without a `places/` prefix).
4. Optionally set the public Google profile/reviews URL and the **Ask for reviews**
   link from your Google Business Profile. With live data enabled, links are also
   supplied automatically. Without a reviews URL, the existing Google Maps
   directions link is used. The write button appears only when its link is available.
5. Visit `/#reviews` and check the rating, author/source links, and mobile layout.

`GET /api/reviews` queries a fixed configured business, keeps the key server-side,
validates Google's response and times out after eight seconds. It returns no-store
responses; review content is not persisted in Next.js, browser storage, or the CMS.
The endpoint is public: each view of the section can result in a billable Places
request. It does not accept arbitrary business IDs from visitors.

Google supplies a limited selection of reviews (up to five), ordered by relevance;
the website preserves that order and displays the original review text when
available. It does not filter for positive ratings. The full set remains available
on Google Maps. See [Place Details](https://developers.google.com/maps/documentation/places/web-service/place-details)
and the [Place resource](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places).

Before enabling the live integration, ensure the website's public terms and privacy
policy incorporate Google's applicable terms and privacy policy, as required by
the [Places API policies](https://developers.google.com/maps/documentation/places/web-service/policies).
Google credentials and a real business Place ID are needed for a live verification.
