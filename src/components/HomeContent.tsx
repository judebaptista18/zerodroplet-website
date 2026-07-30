'use client';

import Link from 'next/link';
import {PortableText} from '@portabletext/react';
import {Button, Card} from 'antd';
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import type {HomePageContent, LogoItem} from '@/lib/home-content';
import {YotpoReviews} from '@/components/YotpoReviews';

const icons = [
  <ExperimentOutlined key="water" />,
  <ExperimentOutlined key="wastewater" />,
  <DashboardOutlined key="monitoring" />,
  <ToolOutlined key="maintenance" />,
  <ToolOutlined key="consultancy" />,
  <ExperimentOutlined key="products" />,
];

function Logo({logo}: {logo: LogoItem}) {
  const image = (
    <img
      src={logo.imageUrl}
      alt={logo.alt}
      loading="lazy"
      decoding="async"
    />
  );

  if (!logo.website) return image;

  return (
    <a
      href={logo.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${logo.name}`}
    >
      {image}
    </a>
  );
}

export function HomeContent({
  homePage,
}: {
  homePage: HomePageContent;
}) {
  const {
    servicesSection,
    about,
    clientShowcase,
    distributorship,
  } = homePage;

  return (
    <>
      <section className="hero">
        <div className="container heroGrid">
          <div>
            <div className="eyebrow">Engineered for every drop</div>
            <h1>Better water.<br /><span>Better tomorrow.</span></h1>
            <p className="lead">We design, supply, execute and maintain water and wastewater treatment systems for communities, hotels, industries and pharmaceutical facilities.</p>
            <div className="actions">
              <Link href="/contact"><Button type="primary" size="large">Request a site survey</Button></Link>
              <Link href="#services"><Button size="large">Explore services</Button></Link>
            </div>
          </div>
          <div className="waterCard">
            <div>
              <strong>200+</strong>
              <h2>Projects delivered across India</h2>
              <p>Process engineering, quality execution and dependable after-sales support.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container stats">
        <div className="stat"><strong>200+</strong><div>Installed projects</div></div>
        <div className="stat"><strong>360°</strong><div>Design-to-maintenance support</div></div>
        <div className="stat"><strong>South India</strong><div>Regional project presence</div></div>
      </div>
      <section id="services" className="section">
        <div className="container">
          <div className="eyebrow">{servicesSection.eyebrow}</div>
          <h2 className="sectionTitle">{servicesSection.heading}</h2>
          {servicesSection.introduction && (
            <p className="lead">{servicesSection.introduction}</p>
          )}
          <div className="cards">
            {servicesSection.services.map((service, index) => (
              <Card key={service.id} className="serviceCard">
                <div className="serviceIcon">{icons[index % icons.length]}</div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link href={`/services/${service.slug}`}>Learn more <ArrowRightOutlined /></Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="section sectionAlt">
        <div className="container aboutGrid">
          <div className="aboutCopy">
            <div className="eyebrow">{about.eyebrow}</div>
            <h2 className="sectionTitle">{about.heading}</h2>
            <div className="lead portableText">
              <PortableText value={about.body} />
            </div>
          </div>
          <div className="process">
            {about.processSteps.map((step, index) => (
              <div className="step" key={step._key}>
                <span className="stepNum">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="clients" className="section clientSection">
        <div className="container sectionIntro">
          <div className="eyebrow">{clientShowcase.eyebrow}</div>
          <h2 className="sectionTitle">{clientShowcase.heading}</h2>
          {clientShowcase.introduction && (
            <p className="lead">{clientShowcase.introduction}</p>
          )}
        </div>
        <div className="logoRail" aria-label="Client logos">
          <div className="logoTrack">
            {[0, 1].map((pass) => (
              <div
                className="logoGroup"
                key={pass}
                aria-hidden={pass === 1}
              >
                {clientShowcase.clients.map((client) => (
                  <div className="logoTile" key={`${pass}-${client._key}`}>
                    <Logo logo={client} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="distributors" className="section distributorSection">
        <div className="container">
          <div className="sectionIntro sectionIntroCentered">
            <div className="eyebrow">{distributorship.eyebrow}</div>
            <h2 className="sectionTitle">{distributorship.heading}</h2>
            {distributorship.introduction && (
              <p className="lead">{distributorship.introduction}</p>
            )}
          </div>
          <div className="distributorGrid">
            {distributorship.partners.map((partner) => (
              <article className="distributorCard" key={partner._key}>
                <div className="distributorLogo">
                  <Logo logo={partner} />
                </div>
                <div className="distributorContent">
                  <div className="authorisedBadge">
                    <CheckCircleOutlined />
                    Authorised distributor
                  </div>
                  <h3>{partner.name}</h3>
                  <ul>
                    {partner.offerings.map((offering) => (
                      <li key={offering}>{offering}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="reviews" className="section">
        <div className="container">
          <div className="eyebrow">Customer feedback</div>
          <h2 className="sectionTitle">Built on performance and trust</h2>
          <YotpoReviews />
        </div>
      </section>
      <section className="section">
        <div className="container cta">
          <div><h2>Have a treatment challenge?</h2><p>Share your requirements and receive an engineering-led response.</p></div>
          <Link href="/contact"><Button size="large">Request a custom quote</Button></Link>
        </div>
      </section>
    </>
  );
}
