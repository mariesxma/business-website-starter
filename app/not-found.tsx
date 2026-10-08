import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section container">
      <p className="eyebrow">404</p>
      <h1>A little off track.</h1>
      <p>This page could not be found.</p>
      <Link className="button" href="/">
        Return home
      </Link>
    </section>
  );
}
