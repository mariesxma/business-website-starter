const questions = [
  [
    "Is this a real business?",
    "No. All business content is fictional and intended for replacement.",
  ],
  [
    "Can I change the design?",
    "Yes. Update the shared color tokens and components to suit your own identity.",
  ],
  [
    "Does the contact form send email immediately?",
    "The default mode is a demonstration. Configure your own email delivery before accepting real enquiries.",
  ],
];
export default function FAQ() {
  return (
    <section className="section container prose">
      <p className="eyebrow">A few useful answers</p>
      <h2>Before you make it yours.</h2>
      {questions.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}
