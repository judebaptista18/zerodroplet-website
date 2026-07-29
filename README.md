# Zero Droplet — Next.js website

Production-oriented starter for `zerodroplet.com` using Next.js 16 App Router, React 19, Ant Design 6, SCSS and pnpm.

## Included
- Responsive brochure/lead-generation website based on the current site's content and blue/teal industrial-water theme.
- Service routes, metadata, sitemap and robots.
- Yotpo site-review widget placeholder.
- Contact/quote form with Zod validation and optional Resend delivery.
- AI enquiry assistant via the OpenAI Responses API, with a safe non-AI fallback.
- Sanity schemas and client wiring.
- Security headers and environment variable template.

## Run
```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

## CMS setup
1. Create a free Sanity project.
2. Put project ID and dataset in `.env.local`.
3. Run `pnpm dlx sanity@latest init` or deploy a separate Studio using `sanity.config.ts` and `src/sanity/schemaTypes`.
4. Replace the local fallback in `src/lib/content.ts` with GROQ queries once content is migrated.

## Integrations
- Add `NEXT_PUBLIC_YOTPO_APP_KEY` from Yotpo On-site Widgets.
- Add `RESEND_API_KEY`, verified sender and destination email.
- Add `OPENAI_API_KEY`; keep it server-side only.
- Add rate limiting and CAPTCHA/Turnstile before public launch.

## Deployment recommendation
Use AWS Amplify Hosting for this commercial site if lowest ongoing cost matters, or Vercel Pro if developer experience and zero-config Next.js support matter more. Do not use Vercel Hobby for a business site. Keep Squarespace as registrar and change only DNS records. BigRock hosting can be retired after cutover.


## Analytics: GTM and GA4

The site uses `@next/third-parties/google` for optimised App Router integration.

Recommended production setup:

1. Create a GA4 property and web data stream.
2. Create a Google Tag Manager web container.
3. Add the GA4 Google tag inside GTM using the GA4 measurement ID.
4. Set only `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` in production.
5. In GTM, create a Custom Event trigger for `generate_lead` and use it for the GA4 lead conversion event.
6. Test using GTM Preview and GA4 DebugView before publishing the container.

Direct GA4 is also supported for simpler deployments by leaving the GTM variable empty and setting `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`. Do not configure both independently because that can duplicate page views.

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
