"use client";

import {EnvironmentOutlined, MailOutlined} from '@ant-design/icons';
import {publicEnv} from '@/lib/env';

export function GoogleMap() {
  return (
    <aside className="contactLocation" aria-labelledby="visit-us-heading">
      <div className="locationMap">
        <iframe
          src={publicEnv.googleMapsEmbedUrl}
          title="Map showing the Zero Droplet office in Margao, Goa"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="locationDetails">
        <div>
          <div className="eyebrow">Visit our office</div>
          <h2 id="visit-us-heading">
            Find us in Margao
          </h2>
        </div>
        <address>
          <EnvironmentOutlined aria-hidden="true" />
          <span>{publicEnv.officeAddress}</span>
        </address>
        <a className="locationEmail" href={`mailto:${publicEnv.contactEmail}`}>
          <MailOutlined aria-hidden="true" />
          <span>{publicEnv.contactEmail}</span>
        </a>
        <div>
          <a
            className="directionsLink"
            href={publicEnv.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get directions to Zero Droplet in Google Maps — opens in a new tab"
          >
            <EnvironmentOutlined aria-hidden="true" />
            Get directions
          </a>
        </div>
      </div>
    </aside>
  );
}
