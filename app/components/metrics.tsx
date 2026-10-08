const data = [
  { label: "Discovery", value: 20 },
  { label: "Design", value: 35 },
  { label: "Build", value: 30 },
  { label: "Review", value: 15 },
];
export default function Metrics() {
  return (
    <figure className="card">
      <figcaption>
        <p className="eyebrow">Fictional data · percent</p>
        <h2>A sample effort mix.</h2>
        <p>Illustrative allocation only. These are not customer results.</p>
      </figcaption>
      <dl className="metric-bars">
        {data.map((d) => (
          <div key={d.label}>
            <dt>{d.label}</dt>
            <dd>
              <span
                className="bar"
                style={{ width: `${d.value * 2}%` }}
                aria-hidden="true"
              />
              <strong>{d.value}%</strong>
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
