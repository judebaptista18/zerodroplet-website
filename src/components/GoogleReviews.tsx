'use client';

import {useEffect, useRef, useState} from 'react';
import {siteConfig} from '@/lib/site-config';
import type {GoogleReviewsData} from '@/lib/google-reviews';

function Stars({rating}: {rating: number}) {
  return (
    <span className="reviewStars" role="img" aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden="true">★★★★★</span>
      <span aria-hidden="true" className="reviewStarsFill" style={{width: `${rating / 5 * 100}%`}}>★★★★★</span>
    </span>
  );
}

export function GoogleReviews() {
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    let started = false;
    async function load() {
      if (started) return;
      started = true;
      try {
        const response = await fetch('/api/reviews', {signal: controller.signal, cache: 'no-store'});
        if (!response.ok) throw new Error('Reviews unavailable');
        const result = await response.json();
        if (!controller.signal.aborted && result.available) setData(result);
      } catch {
        // The Google profile remains accessible when live reviews are unavailable.
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    if (!('IntersectionObserver' in window)) {
      void load();
      return () => controller.abort();
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { void load(); observer.disconnect(); }
    }, {rootMargin: '200px'});
    if (root.current) observer.observe(root.current);
    return () => { controller.abort(); observer.disconnect(); };
  }, []);

  const reviewsUrl = siteConfig.googleReviewsUrl || data?.googleMapsUri || siteConfig.googleMapsDirectionsUrl;
  const writeUrl = siteConfig.googleWriteReviewUrl || data?.writeReviewUrl;
  const reviews = data?.reviews || [];

  return (
    <div className="googleReviews" ref={root}>
      <div className="reviewsOverview">
        <div>
          <span className="reviewsSource">Google Maps</span>
          {data?.rating && data.userRatingCount ? (
            <div className="reviewsRating">
              <strong>{data.rating.toFixed(1)}</strong>
              <div><Stars rating={data.rating} /><p>Based on {data.userRatingCount.toLocaleString('en')} Google reviews</p></div>
            </div>
          ) : (
            <><h3>Your experience matters.</h3><p>Worked with Zero Droplet? Share your experience and help others choose with confidence.</p></>
          )}
        </div>
        <div className="reviewsActions">
          {writeUrl && <a className="reviewButton reviewButtonPrimary" href={writeUrl} target="_blank" rel="noopener noreferrer">Write a review <span aria-hidden="true">↗</span></a>}
          <a className="reviewButton" href={reviewsUrl} target="_blank" rel="noopener noreferrer">View on Google Maps <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      {loading ? <p className="reviewsNotice" role="status">Loading customer feedback…</p> : reviews.length > 0 ? (
        <>
          <div className="reviewsCaption"><span>In our customers’ words</span><span>Sorted by relevance on Google</span></div>
          <div className="reviewsGrid">
            {reviews.map((review) => (
              <article className="reviewCard" key={review.name}>
                <div className="reviewAuthor">
                  <span className="reviewAvatar" aria-hidden="true">
                    {review.authorAttribution.photoUri ? <img src={review.authorAttribution.photoUri} alt="" loading="lazy" referrerPolicy="no-referrer" /> : review.authorAttribution.displayName.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <a href={review.authorAttribution.uri || review.googleMapsUri || reviewsUrl} target="_blank" rel="noopener noreferrer">{review.authorAttribution.displayName}</a>
                    <p>{review.relativePublishTimeDescription}</p>
                  </div>
                </div>
                <Stars rating={review.rating} />
                <p className="reviewText">{review.originalText?.text || review.text?.text || 'This customer left a star rating.'}</p>
                <a className="reviewSourceLink" href={review.googleMapsUri || reviewsUrl} target="_blank" rel="noopener noreferrer">Read on Google Maps <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </>
      ) : <p className="reviewsNotice">Explore customer feedback on our Google profile.</p>}
      {data?.attributions.map((attribution, index) => (
        <p className="reviewsNotice" key={`${attribution.provider}-${index}`}>
          {attribution.providerUri ? <a href={attribution.providerUri} target="_blank" rel="noopener noreferrer">{attribution.provider}</a> : attribution.provider}
        </p>
      ))}
    </div>
  );
}
