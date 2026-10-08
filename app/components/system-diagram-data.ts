export type DiagramStep = {
  title: string;
  label: string;
  detail: string;
  input: string;
  output: string;
  connection?: string;
  branch?: string;
};
export type DiagramDefinition = {
  title: string;
  kind: "flow" | "stack" | "gates";
  caption: string;
  feedback: string;
  steps: DiagramStep[];
};
export const diagrams: Record<"workflow", DiagramDefinition> = {
  workflow: {
    title: "A simple project journey",
    kind: "flow",
    caption: "Fictional workflow example",
    feedback:
      "Review the result and update the brief before starting the next cycle.",
    steps: [
      {
        title: "Brief",
        label: "Find a starting point",
        detail: "Agree the audience, purpose, and a small first outcome.",
        input: "An idea",
        output: "A shared brief",
        connection: "guides",
      },
      {
        title: "Make",
        label: "Try a useful first version",
        detail: "Create a small version that can be reviewed together.",
        input: "A shared brief",
        output: "A prototype",
        connection: "invites",
      },
      {
        title: "Review",
        label: "Decide what comes next",
        detail: "Compare the prototype with the brief and collect feedback.",
        input: "A prototype",
        output: "Next steps",
        branch: "If the direction is unclear, revise the brief and try again.",
      },
    ],
  },
};
export type DiagramName = keyof typeof diagrams;
