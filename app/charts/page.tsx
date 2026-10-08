import Estimator from "../components/estimator";
import Timeline from "../components/timeline";
import Metrics from "../components/metrics";
import SystemDiagram from "../components/system-diagram";
export const metadata = {
  title: "Visual examples",
  description: "Fictional charts and reusable interactive diagrams.",
};
export default function Charts() {
  return (
    <section className="section container">
      <p className="eyebrow">A reusable visual toolkit</p>
      <h1>Explain it clearly.</h1>
      <p className="lede">
        Sample charts, timelines, and diagrams. Every figure and scenario is
        illustrative.
      </p>
      <div className="gallery">
        <SystemDiagram name="workflow" wide />
        <div className="grid">
          <Metrics />
          <Estimator />
        </div>
        <SystemDiagram name="layers" wide />
        <Timeline />
      </div>
    </section>
  );
}
