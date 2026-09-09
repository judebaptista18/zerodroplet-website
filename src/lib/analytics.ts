type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  if (siteConfig.gtmId) {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...payload });
    return;
  }

  if (siteConfig.gaMeasurementId && window.gtag) {
    window.gtag("event", event, payload);
  }
}
import {siteConfig} from '@/lib/site-config';
