import { site } from "../../config/site";
export default function Contact() {
  return (
    <section className="section container prose">
      <p className="eyebrow">Get in touch</p>
      <h1>Start with a conversation.</h1>
      <p className="lede">
        Tell us what you are exploring and what a useful outcome would look
        like.
      </p>
      <p className="notice">
        This is a demonstration. The email address is a placeholder.
      </p>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </section>
  );
}
