'use client';

import Link from 'next/link';
import {Button} from 'antd';
import {CheckCircleOutlined} from '@ant-design/icons';

type Service = {
  title: string;
  summary: string;
  items: string[];
};

export function ServiceDetails({service}: {service: Service}) {
  return (
    <>
      <section className="pageHero">
        <div className="container">
          <div className="eyebrow">Zero Droplet service</div>
          <h1 className="sectionTitle">{service.title}</h1>
          <p className="lead">{service.summary}</p>
        </div>
      </section>
      <section className="section">
        <div className="container heroGrid">
          <div>
            <h2>Capabilities</h2>
            {service.items.map((item) => (
              <p key={item}>
                <CheckCircleOutlined style={{color: '#0b8f87', marginRight: 10}} />
                {item}
              </p>
            ))}
          </div>
          <div className="cta" style={{display: 'block'}}>
            <h2>Discuss your site</h2>
            <p>
              Our engineers can assess capacity, process constraints, compliance
              requirements and operating costs.
            </p>
            <Link href="/contact">
              <Button>Request consultation</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
