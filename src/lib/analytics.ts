type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return;

  if (process.env.NEXT_PUBLIC_GTM_ID) {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({event, ...payload});
    return;
  }

  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', event, payload);
  }
}
