'use client';

import Link from 'next/link';
import {Button, Card} from 'antd';
import {
  ArrowRightOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import type {Service} from '@/lib/content';
import {YotpoReviews} from '@/components/YotpoReviews';

const icons = [
  <ExperimentOutlined key="water" />,
  <ExperimentOutlined key="wastewater" />,
  <DashboardOutlined key="monitoring" />,
  <ToolOutlined key="maintenance" />,
  <ToolOutlined key="consultancy" />,
  <ExperimentOutlined key="products" />,
];

export function HomeContent({services}: {services: Service[]}) {
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
          <div className="eyebrow">Our services</div>
          <h2 className="sectionTitle">Complete treatment solutions, not isolated equipment</h2>
          <div className="cards">
            {services.map((service, index) => (
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
        <div className="container heroGrid">
          <div>
            <div className="eyebrow">About Zero Droplet</div>
            <h2 className="sectionTitle">Engineering expertise with accountable delivery</h2>
            <p className="lead">Based in Margao, Goa, our environmental experts and chemical engineers support the full project lifecycle: site survey, detailed design, procurement, execution, commissioning, operations and maintenance.</p>
          </div>
          <div className="process">
            <div className="step"><span className="stepNum">01</span><h3>Survey</h3><p>Understand source water, effluent, space and compliance needs.</p></div>
            <div className="step"><span className="stepNum">02</span><h3>Design</h3><p>Engineer the right process and lifecycle cost.</p></div>
            <div className="step"><span className="stepNum">03</span><h3>Deliver</h3><p>Procure, install, test and commission.</p></div>
            <div className="step"><span className="stepNum">04</span><h3>Support</h3><p>Maintain performance with responsive service.</p></div>
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
