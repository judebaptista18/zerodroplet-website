"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";

export function Header() {
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Link
          className="headerBrand"
          href="/"
          aria-label="Zero Droplet home"
        >
          <Image
            src="/brand/zero-droplet-logo.png"
            alt="Zero Droplet Engineers and Consultants"
            width={2775}
            height={644}
            priority
            sizes="(max-width: 600px) 190px, 240px"
          />
        </Link>
        <nav className="nav">
          <Link href="/#services">Services</Link>
          <Link href="/#about">About</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/contact">
            <Button type="primary">Request a quote</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
