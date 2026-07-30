"use client";

import Link from "next/link";
import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  WhatsAppOutlined,
} from '@ant-design/icons';
import {publicEnv} from '@/lib/env';

export function Footer() {
  const socialLinks = [
    {
      label: 'Facebook',
      href: publicEnv.facebookUrl,
      icon: <FacebookFilled />,
    },
    {
      label: 'Instagram',
      href: publicEnv.instagramUrl,
      icon: <InstagramOutlined />,
    },
    {
      label: 'LinkedIn',
      href: publicEnv.linkedinUrl,
      icon: <LinkedinFilled />,
    },
    {
      label: 'WhatsApp',
      href: publicEnv.whatsappUrl,
      icon: <WhatsAppOutlined />,
    },
  ];

  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div>
          <div className="brand" style={{ color: "white" }}>
            ZERO <span>DROPLET</span>
          </div>
          <p>
            Water and wastewater treatment plants, products, consultancy and
            lifecycle services across South India.
          </p>
          <nav className="socialLinks" aria-label="Zero Droplet social media">
            {socialLinks.map((social) => (
              <a
                href={social.href}
                key={social.label}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} — opens in a new tab`}
              >
                <span className="socialIcon" aria-hidden="true">
                  {social.icon}
                </span>
                <span>{social.label}</span>
              </a>
            ))}
          </nav>
        </div>
        <div>
          <strong>Explore</strong>
          <p>
            <Link href="/#services">Services</Link>
          </p>
          <p>
            <Link href="/contact">Contact</Link>
          </p>
        </div>
        <div>
          <strong>Registered office</strong>
          <p>{publicEnv.officeAddress}</p>
          <p>{publicEnv.contactEmail}</p>
        </div>
      </div>
      <div className="container">
        <hr style={{ borderColor: "#417fc2", margin: "30px 0" }} />
        <small>
          © {new Date().getFullYear()} Zero Droplet Engineers & Consultants. All
          rights reserved.
        </small>
      </div>
    </footer>
  );
}
