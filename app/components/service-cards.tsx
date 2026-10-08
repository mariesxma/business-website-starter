import Link from "next/link";
import { services } from "../../config/services";
export default function ServiceCards() {
  return (
    <div className="grid">
      {services.map((service, i) => (
        <article className="card" key={service.slug}>
          <p className="eyebrow">0{i + 1} / Sample service</p>
          <h3>{service.title}</h3>
          <p>{service.summary}</p>
          <Link href={`/services#${service.slug}`}>
            Explore {service.title.toLowerCase()} →
          </Link>
        </article>
      ))}
    </div>
  );
}
