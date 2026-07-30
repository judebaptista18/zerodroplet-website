import { ContactForm } from "@/components/ContactForm";
import {GoogleMap} from '@/components/GoogleMap';

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
      <section className="section contactSection">
        <div className="container contactLayout">
          <div className="contactFormPanel">
            <div className="eyebrow">Project enquiry</div>
            <h2>How can we help?</h2>
            <p>
              For faster assessment, include available water analysis, effluent
              analysis, plant capacity and site photographs.
            </p>
            <ContactForm />
          </div>
          <GoogleMap />
        </div>
      </section>
    </>
  );
}
