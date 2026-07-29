import Link from "next/link";
export function Footer() {
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
          <p>Margao, Goa, India</p>
          <p>info@zerodroplet.com</p>
        </div>
      </div>
      <div className="container">
        <hr style={{ borderColor: "#28515b", margin: "30px 0" }} />
        <small>
          © {new Date().getFullYear()} Zero Droplet Engineers & Consultants. All
          rights reserved.
        </small>
      </div>
    </footer>
  );
}
