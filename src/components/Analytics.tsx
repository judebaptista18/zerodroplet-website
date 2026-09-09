"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import {siteConfig} from '@/lib/site-config';

/**
 * GTM is preferred in production because GA4 and future marketing tags can be
 * governed from one container. Direct GA4 is loaded only when GTM is absent,
 * avoiding duplicate page-view events.
 */
export function Analytics() {
  const gtmId = siteConfig.gtmId;
  const gaId = siteConfig.gaMeasurementId;

  if (gtmId) return <GoogleTagManager gtmId={gtmId} />;
  if (gaId) return <GoogleAnalytics gaId={gaId} />;
  return null;
}
