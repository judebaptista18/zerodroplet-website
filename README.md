# Zero Droplet — Next.js website

Production-oriented starter for `zerodroplet.com` using Next.js 16 App Router, React 19, Ant Design 6, SCSS and pnpm.

## Included
- Responsive brochure/lead-generation website based on the current site's content and blue/teal industrial-water theme.
- Service routes, metadata, sitemap and robots.
- Custom Google reviews section with optional live Google Places integration.
- Contact/quote form with Zod validation and configurable Google Forms or Resend delivery.
- AI enquiry assistant via the OpenAI Responses API, with a safe non-AI fallback.
- Sanity schemas and client wiring.
- Security headers and environment variable template.

## Run
```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

## Configuration

Non-sensitive values are version-controlled:

- `src/lib/site-config.ts`: canonical production URL, contact details, social and map links, analytics IDs, Google Place ID and review links.
- `src/lib/server-config.ts`: AI model and email sender/recipient. Email addresses are initially empty; configure them before enabling Resend.
- `src/sanity/env.ts`: public Sanity project ID, dataset and API version.

Edit these files and redeploy to change settings. The former `NEXT_PUBLIC_*`,
`SANITY_STUDIO_*`, `OPENAI_MODEL`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, and
`GOOGLE_PLACE_ID` environment variables are no longer read and can be removed
from Amplify. The canonical site URL stays `https://zerodroplet.com` locally too,
so metadata and sitemap links point to production.

Only optional integration credentials and the server-side Google Forms receiver
settings remain in `.env.example`. Copy it to `.env.local` for local development.
On Amplify, server credentials also need runtime secret configuration; adding a
Hosting build variable alone does not make it available to Next.js API routes.

## CMS setup
1. Create a free Sanity project.
2. Set the public project ID, dataset and API version in `src/sanity/env.ts`.
3. Run the standalone authoring environment with `pnpm studio:dev`.
4. Create and publish `service` documents. The website reads published Sanity content and safely uses `src/lib/content.ts` when Sanity is not configured or unavailable.

The Studio shares the settings in `src/sanity/env.ts` and runs
separately at `http://localhost:3333`; add both local and production website
origins to the project's Sanity CORS settings.

## Integrations
- To save enquiries to Google Forms with the current frontend, follow [Google Forms setup](integrations/google-forms/README.md). Includes the Apps Script receiver and server-only environment settings.
- Follow [Google reviews setup](integrations/google-reviews/README.md) to enable live ratings, review cards and Google profile links.
- Add `RESEND_API_KEY`; set the verified sender and destination email in `src/lib/server-config.ts`.
- Add `OPENAI_API_KEY`; keep it server-side only. The model is configured in `src/lib/server-config.ts`.
- Add rate limiting and CAPTCHA/Turnstile before public launch.

## Deployment recommendation
Use AWS Amplify Hosting for this commercial site if lowest ongoing cost matters, or Vercel Pro if developer experience and zero-config Next.js support matter more. Do not use Vercel Hobby for a business site. Keep Squarespace as registrar and change only DNS records. BigRock hosting can be retired after cutover.


## Analytics: GTM and GA4

The site uses `@next/third-parties/google` for optimised App Router integration.

Recommended production setup:

1. Create a GA4 property and web data stream.
2. Create a Google Tag Manager web container.
3. Add the GA4 Google tag inside GTM using the GA4 measurement ID.
4. Set `gtmId` in `src/lib/site-config.ts` to your GTM container ID.
5. In GTM, create a Custom Event trigger for `generate_lead` and use it for the GA4 lead conversion event.
6. Test using GTM Preview and GA4 DebugView before publishing the container.

Direct GA4 is also supported for simpler deployments by leaving `gtmId` empty and setting `gaMeasurementId` in `src/lib/site-config.ts`. Do not configure both independently because that can duplicate page views.

The contact form pushes these events:

- `generate_lead` after a successful enquiry
- `contact_form_error` after a failed enquiry

## SEO sitemap

Next.js generates the sitemap from `src/app/sitemap.ts` and serves it at:

```text
https://zerodroplet.com/sitemap.xml
```

It includes the homepage, contact page and all service routes. `robots.ts` references the sitemap. Submit the sitemap URL in Google Search Console after launch.

## Unit tests with Jest

```bash
pnpm test
pnpm test:watch
pnpm test:coverage
```

Unit tests use Jest, jsdom, React Testing Library and `user-event`. Current coverage includes sitemap completeness, contact-form validation and successful form submission.

## End-to-end tests with Playwright

Install browser binaries once:

```bash
pnpm exec playwright install --with-deps
```

Run tests:

```bash
pnpm test:e2e
pnpm test:e2e:ui
```

Playwright runs desktop Chromium and a Pixel 7 mobile profile. The suite verifies homepage navigation, sitemap availability and contact form submission with the API request mocked.

For CI:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm test:e2e
```
