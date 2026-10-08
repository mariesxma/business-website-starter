import fs from "node:fs";
import path from "node:path";
const root = new URL("../", import.meta.url).pathname;
const excluded = new Set([
  ".git",
  "node_modules",
  "dist",
  ".wrangler",
  ".next",
  ".vinext",
]);
const attribution = new Set(["NOTICE.md", "licenses/upstream-MIT.txt"]);
const forbidden = [
  /pri(?:techk|techsupport|tech[- ]support)/i,
  /[A-Z0-9._%+-]+@(?:gmail|outlook|icloud)\.com/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /sk-proj-[A-Za-z0-9_-]{20,}/,
];
const failures = [];
function scan(dir, relative = "") {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (excluded.has(item.name)) continue;
    const rel = path.join(relative, item.name);
    if (item.isSymbolicLink()) continue;
    if (item.isDirectory()) {
      scan(path.join(dir, item.name), rel);
      continue;
    }
    if (attribution.has(rel) || rel === "scripts/check-template.mjs") continue;
    const bytes = fs.readFileSync(path.join(dir, item.name));
    if (bytes.includes(0)) {
      failures.push(`${rel}: unexpected binary asset`);
      continue;
    }
    const text = bytes.toString();
    if (forbidden.some((pattern) => pattern.test(text)))
      failures.push(`${rel}: source identity or secret-like value`);
  }
}
scan(root);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Template content scan passed; attribution preserved.");
