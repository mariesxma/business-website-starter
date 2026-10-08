import Link from "next/link";
import { site } from "../../config/site";
export default function Header() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header container">
        <Link className="wordmark" href="/">
          {site.name}
          <span aria-hidden="true"> ↗</span>
        </Link>
        <nav aria-label="Main">
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/charts">Examples</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>
    </>
  );
}
