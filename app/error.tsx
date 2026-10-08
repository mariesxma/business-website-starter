"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section container">
      <h1>Something went wrong.</h1>
      <p>Please try again. If the problem continues, return to the homepage.</p>
      <div className="actions">
        <button className="button" onClick={reset}>
          Try again
        </button>
        <Link href="/">Return home</Link>
      </div>
    </section>
  );
}
