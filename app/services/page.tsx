import Link from "next/link";
import { services } from "../../config/services";
export default function Services() {
  return (
    <section className="section container">
      <p className="eyebrow">Sample services</p>
      <h1>A clear path forward.</h1>
      <p className="lede">
        These are fictional service examples. Replace them with your own
        offering.
      </p>
      <div className="grid">
        {services.map((s) => (
          <article className="card" id={s.slug} key={s.slug}>
            <h2>{s.title}</h2>
            <p>{s.summary}</p>
            <ul>
              {s.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <Link href="/contact">Discuss a project →</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
