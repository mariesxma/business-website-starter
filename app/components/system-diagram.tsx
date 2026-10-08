// Adapted under licenses/upstream-MIT.txt.
"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  diagrams,
  type DiagramDefinition,
  type DiagramName,
} from "./system-diagram-data";

export default function SystemDiagram({
  name,
  wide = false,
}: {
  name: DiagramName;
  wide?: boolean;
}) {
  const data: DiagramDefinition = diagrams[name];
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [motion, setMotion] = useState(false);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const active = data.steps[selected];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMotion(!preference.matches);
      if (preference.matches) setPlaying(false);
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (selected === data.steps.length - 1) setPlaying(false);
      else setSelected(selected + 1);
    }, 5500);
    return () => window.clearTimeout(timer);
  }, [playing, selected, data.steps.length]);
  useEffect(() => {
    const stop = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", stop);
    return () => document.removeEventListener("visibilitychange", stop);
  }, []);

  function choose(index: number, focus = false) {
    setSelected(index);
    setPlaying(false);
    if (focus) buttons.current[index]?.focus();
  }

  return (
    <figure
      className={`system-diagram diagram-${data.kind} diagram-${name} ${wide ? "diagram-wide" : ""} ${motion ? "diagram-motion" : ""} ${playing ? "diagram-playing" : ""}`}
      aria-labelledby={`${id}-title`}
    >
      <figcaption>
        <span className="diagram-overline">{data.caption}</span>
        <h2 id={`${id}-title`}>{data.title}</h2>
      </figcaption>
      <div className="diagram-workspace">
        <div className="diagram-map">
          <div
            className="diagram-steps"
            role="group"
            aria-label={`${data.title}: select a ${data.kind === "stack" ? "layer" : "stage"}`}
          >
            {data.steps.map((step, index) => (
              <div className="diagram-step" key={step.title}>
                <button
                  ref={(element) => {
                    buttons.current[index] = element;
                  }}
                  type="button"
                  aria-pressed={selected === index}
                  aria-controls={`${id}-detail`}
                  onClick={() => choose(index)}
                  onKeyDown={(event) => {
                    if (
                      !["ArrowDown", "ArrowUp", "Home", "End"].includes(
                        event.key,
                      )
                    )
                      return;
                    event.preventDefault();
                    choose(
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? data.steps.length - 1
                          : (index +
                              (event.key === "ArrowDown"
                                ? 1
                                : data.steps.length - 1)) %
                            data.steps.length,
                      true,
                    );
                  }}
                >
                  <span className="diagram-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{step.title}</strong>
                    <small>{step.label}</small>
                  </span>
                </button>
                {!["stack"].includes(data.kind) &&
                  index < data.steps.length - 1 && (
                    <div
                      className={`diagram-connection ${selected === index ? "is-active" : ""}`}
                    >
                      <i aria-hidden="true" />
                      <span>{step.connection}</span>
                      <b aria-hidden="true">↓</b>
                    </div>
                  )}
              </div>
            ))}
          </div>
          {data.kind === "stack" && (
            <div className="layer-visual" aria-hidden="true">
              <svg viewBox="0 0 260 360">
                <path className="stack-spine" d="M140 20V338" />
                {data.steps.map((step, index) => {
                  const y = 265 - index * 65;
                  return (
                    <g
                      key={step.title}
                      className={
                        selected === index
                          ? "stack-plane active"
                          : "stack-plane"
                      }
                      style={{ transformOrigin: `130px ${y}px` }}
                    >
                      <path
                        className="plane-face"
                        d={`M25 ${y} L125 ${y - 36} L240 ${y + 2} L140 ${y + 38}Z`}
                      />
                      <path
                        className="plane-edge"
                        d={`M25 ${y}v9L140 ${y + 47}L240 ${y + 11}v-9M140 ${y + 38}v9`}
                      />
                      <path
                        className="plane-grid"
                        d={`M60 ${y - 12}L174 ${y + 26}M91 ${y - 24}L205 ${y + 14}M63 ${y + 12}L162 ${y - 24}M101 ${y + 25}L201 ${y - 11}`}
                      />
                      <text x="123" y={y + 5}>
                        {String(index + 1).padStart(2, "0")}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <span>
                Lower layers support
                <br />
                the capabilities above
              </span>
            </div>
          )}
        </div>
        <div
          className="diagram-detail"
          id={`${id}-detail`}
          aria-live={playing ? "off" : "polite"}
        >
          <span className="diagram-overline">
            {String(selected + 1).padStart(2, "0")} / {data.steps.length} ·{" "}
            {data.kind === "stack" ? "Architecture layer" : "Selected stage"}
          </span>
          <h3>{active.title}</h3>
          <p>{active.detail}</p>
          <dl className="diagram-io">
            <div>
              <dt>Input</dt>
              <dd>{active.input}</dd>
            </div>
            <div>
              <dt>Output</dt>
              <dd>{active.output}</dd>
            </div>
          </dl>
          {active.branch && (
            <div className="diagram-exception">
              <p>
                <strong>When this cannot proceed</strong>
                <br />
                {active.branch}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="diagram-controls">
        <button
          type="button"
          onClick={() => {
            if (selected === data.steps.length - 1) setSelected(0);
            setPlaying(!playing);
          }}
          aria-pressed={playing}
        >
          {playing ? "Pause walkthrough" : "Play walkthrough"}
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMotion(!motion);
            setPlaying(false);
          }}
          aria-pressed={motion}
        >
          Motion {motion ? "on" : "off"}
        </button>
      </div>
      <p className="diagram-feedback">
        <span aria-hidden="true">↳</span>
        {data.feedback}
      </p>
    </figure>
  );
}
