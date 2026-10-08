import fs from "node:fs";
const config = JSON.parse(
  fs.readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
);
const site = fs.readFileSync(
  new URL("../config/site.ts", import.meta.url),
  "utf8",
);
const vars = config.vars || {};
const errors = [];
let origin;
try {
  origin = new URL(vars.SITE_ORIGIN);
} catch {
  errors.push("Set SITE_ORIGIN to your public HTTPS origin.");
}
if (
  origin &&
  (origin.protocol !== "https:" ||
    origin.pathname !== "/" ||
    origin.search ||
    origin.hash ||
    origin.username ||
    origin.password ||
    ["example.com", "localhost", "127.0.0.1"].includes(origin.hostname))
)
  errors.push(
    "Use your own HTTPS origin, without a path, credentials, or query.",
  );
if (/example\.com|Example Studio/.test(site))
  errors.push("Replace the public placeholders in config/site.ts.");
if (origin && !site.includes(origin.origin))
  errors.push("Keep config/site.ts url and SITE_ORIGIN aligned.");
if (!["demo", "live"].includes(vars.CONTACT_MODE))
  errors.push("Choose CONTACT_MODE demo or live.");
if (vars.CONTACT_MODE === "live") {
  for (const key of ["CONTACT_TO", "CONTACT_FROM"])
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vars[key] || "") ||
      /@example\.com$/.test(vars[key])
    )
      errors.push(`Set ${key} to your own address.`);
  if (
    !config.send_email?.some(
      (x) =>
        x.name === "ENQUIRY_EMAIL" &&
        x.allowed_destination_addresses?.includes(vars.CONTACT_TO),
    )
  )
    errors.push(
      "Configure ENQUIRY_EMAIL with the allowed CONTACT_TO destination.",
    );
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Deployment configuration passed.");
