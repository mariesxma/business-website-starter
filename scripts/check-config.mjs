import fs from "node:fs";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { site } from "../config/site.ts";

export function parseConfig(text) {
  const result = ts.parseConfigFileTextToJson("wrangler.jsonc", text);
  if (result.error) throw new Error("Invalid wrangler.jsonc configuration.");
  return result.config;
}

export function validateDeployment(config, publicSite) {
  const vars = config.vars || {};
  const errors = [];
  let origin;
  try { origin = new URL(vars.SITE_ORIGIN); }
  catch { errors.push("Set SITE_ORIGIN to your public HTTPS origin."); }
  if (origin && (origin.protocol !== "https:" || vars.SITE_ORIGIN !== origin.origin || ["example.com", "localhost", "127.0.0.1"].includes(origin.hostname))) {
    errors.push("Use your own HTTPS origin, without a trailing slash, path, credentials, or query.");
  }
  if (publicSite.name === "Example Studio" || /example\.com/.test(publicSite.url) || /@example\.com$/.test(publicSite.email)) errors.push("Replace the public placeholders in config/site.ts.");
  if (origin && publicSite.url !== origin.origin) errors.push("Keep config/site.ts url and SITE_ORIGIN aligned.");
  if (!["demo", "live"].includes(vars.CONTACT_MODE)) errors.push("Choose CONTACT_MODE demo or live.");
  if (vars.CONTACT_MODE === "live") {
    for (const key of ["CONTACT_TO", "CONTACT_FROM"]) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vars[key] || "") || /@example\.com$/.test(vars[key])) errors.push(`Set ${key} to your own address.`);
    }
    if (!config.send_email?.some(binding => binding.name === "ENQUIRY_EMAIL" && binding.allowed_destination_addresses?.includes(vars.CONTACT_TO))) errors.push("Configure ENQUIRY_EMAIL with the allowed CONTACT_TO destination.");
    if (!config.ratelimits?.some(binding => binding.name === "ENQUIRY_RATE_LIMIT")) errors.push("Configure the ENQUIRY_RATE_LIMIT binding before enabling delivery.");
  }
  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const config = parseConfig(fs.readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8"));
    const errors = validateDeployment(config, site);
    if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
    else console.log("Deployment configuration passed.");
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
