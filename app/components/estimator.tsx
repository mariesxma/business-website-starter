"use client";
import { useState } from "react";
export default function Estimator() {
  const [pages, setPages] = useState(4);
  return (
    <section className="card">
      <p className="eyebrow">Interactive example</p>
      <h2>Explore a sample scope.</h2>
      <p>
        Fictional planning model: 2 setup days plus half a day per page. This is
        not a quote or delivery promise.
      </p>
      <label htmlFor="pages">
        Number of pages: <strong>{pages}</strong>
      </label>
      <input
        id="pages"
        type="range"
        min="1"
        max="20"
        value={pages}
        onChange={(e) => setPages(Number(e.target.value))}
      />
      <p>
        <output htmlFor="pages" aria-live="polite">
          {2 + pages * 0.5} illustrative working days
        </output>
      </p>
    </section>
  );
}
