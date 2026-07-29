"use client";

import Link from "next/link";
import { Button } from "antd";
export function Header() {
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Link className="brand" href="/">
          ZERO <span>DROPLET</span>
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
