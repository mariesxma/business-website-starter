import FAQ from "./components/faq";
import ServiceCards from "./components/service-cards";
import Link from "next/link";
import { site } from "../config/site";
export default function Home() {
  return (
    <>
      <section className="section container hero">
        <div>
          <p className="eyebrow">A business website starter</p>
          <h1>{site.tagline}</h1>
          <p className="lede">
            A flexible starting point for presenting your work, explaining your
            services, and starting a conversation.
          </p>
          <div className="actions">
            <Link className="button" href="/services">
              Explore services
            </Link>
            <Link className="button secondary" href="/contact">
              Start a conversation
            </Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span>01 / Discover</span>
          <span>02 / Make</span>
          <span>03 / Improve</span>
          <div className="art-ring" />
        </div>
      </section>
      <section className="section container">
        <p className="eyebrow">What you could offer</p>
        <h2>Room for your expertise.</h2>
        <ServiceCards />
      </section>
      <FAQ />
    </>
  );
}
