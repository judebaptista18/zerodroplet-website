"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

/**
 * GTM is preferred in production because GA4 and future marketing tags can be
 * governed from one container. Direct GA4 is loaded only when GTM is absent,
 * avoiding duplicate page-view events.
 */
export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (gtmId) return <GoogleTagManager gtmId={gtmId} />;
  if (gaId) return <GoogleAnalytics gaId={gaId} />;
  return null;
}
