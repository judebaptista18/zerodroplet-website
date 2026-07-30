import { ContactForm } from "@/components/ContactForm";
import {publicEnv} from '@/lib/env';

export const metadata = { title: "Contact" };
export default function Contact() {
  return (
    <>
      <section className="pageHero">
        <div className="container">
          <div className="eyebrow">Contact us</div>
          <h1 className="sectionTitle">Tell us about your requirement</h1>
          <p className="lead">
            Share the application, desired capacity, location and current water
            or effluent challenge.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container heroGrid">
          <ContactForm />
          <div>
            <h2>Zero Droplet Engineers & Consultants</h2>
            <p>Registered office: Margao, Goa, India</p>
            <p>Email: {publicEnv.contactEmail}</p>
            <p>
              For faster assessment, include available water analysis, effluent
              analysis, plant capacity and site photographs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
