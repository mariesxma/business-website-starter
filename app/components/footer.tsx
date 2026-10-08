import Link from "next/link";
import { site } from "../../config/site";
export default function Footer() {
  return (
    <footer className="container site-footer">
      <div>
        <strong>{site.name}</strong>
        <p className="small">
          Demonstration business. All services and figures are fictional.
        </p>
      </div>
      <nav aria-label="Footer">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <a href={`mailto:${site.email}`}>Email</a>
      </nav>
    </footer>
  );
}
