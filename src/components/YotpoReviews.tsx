"use client";
import Script from "next/script";
import {publicEnv} from '@/lib/env';

export function YotpoReviews() {
  const key = publicEnv.yotpoAppKey;
  if (!key)
    return (
      <div style={{ padding: 24, border: "1px dashed #9ab", borderRadius: 12 }}>
        Yotpo Reviews placeholder — add <code>NEXT_PUBLIC_YOTPO_APP_KEY</code>{" "}
        to activate ratings and site reviews.
      </div>
    );
  return (
    <>
      <Script
        src={`https://staticw2.yotpo.com/${key}/widget.js`}
        strategy="lazyOnload"
      />
      <div
        className="yotpo yotpo-main-widget"
        data-product-id="zerodroplet-site"
        data-name="Zero Droplet"
        data-url={publicEnv.siteUrl}
      />
    </>
  );
}
