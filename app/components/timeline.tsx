const milestones = [
  {
    title: "Agree a brief",
    detail: "Write down the goal and a useful first outcome.",
  },
  {
    title: "Explore together",
    detail: "Review sample ideas and choose a direction.",
  },
  {
    title: "Make and review",
    detail: "Test a first release and record what needs attention.",
  },
  {
    title: "Hand over",
    detail: "Share the working materials and a plan for updates.",
  },
];
export default function Timeline() {
  return (
    <section className="card">
      <p className="eyebrow">Sample process</p>
      <h2>From idea to handover.</h2>
      <ol className="timeline">
        {milestones.map((m) => (
          <li key={m.title}>
            <h3>{m.title}</h3>
            <p>{m.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
