export const services = [
  {
    slug: "discovery",
    title: "Discovery",
    summary: "Turn a broad idea into a clear starting point.",
    deliverables: ["A shared brief", "A practical roadmap", "Success criteria"],
  },
  {
    slug: "design",
    title: "Design",
    summary: "Explore how your next experience could look and feel.",
    deliverables: [
      "Concept directions",
      "A working prototype",
      "Design guidance",
    ],
  },
  {
    slug: "delivery",
    title: "Delivery",
    summary: "Build, review, and improve a useful first release.",
    deliverables: ["A tested release", "Handover notes", "An improvement plan"],
  },
] as const;
