import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import { parseConfig, validateDeployment } from "../scripts/check-config.mjs";
const publicSite = { name:"Sample Workshop", url:"https://studio.example", email:"hello@studio.example" };
const config = { vars: { SITE_ORIGIN:publicSite.url, CONTACT_MODE:"demo" } };
test("accepts Cloudflare JSONC comments and trailing commas", () => {
  assert.deepEqual(parseConfig('{ // a comment\n "vars": {},\n}'),{vars:{}});
  const shipped = parseConfig(fs.readFileSync(new URL("../wrangler.jsonc",import.meta.url),"utf8"));
  assert.equal(shipped.vars.CONTACT_MODE,"demo");
  assert.throws(()=>parseConfig("{"),/Invalid/);
});
test("deployment validates real configuration and exact browser origin",()=>{
  assert.deepEqual(validateDeployment(config,publicSite),[]);
  for(const SITE_ORIGIN of ["http://studio.example","https://studio.example/","https://studio.example/path","https://user@studio.example","https://example.com"]){assert.ok(validateDeployment({vars:{...config.vars,SITE_ORIGIN}},publicSite).length>0);}
  assert.ok(validateDeployment(config,{...publicSite,name:"Example Studio"}).length>0);
});
test("live mode requires mail and rate-limit bindings",()=>{
  const live={vars:{...config.vars,CONTACT_MODE:"live",CONTACT_TO:"inbox@studio.example",CONTACT_FROM:"website@studio.example"},send_email:[{name:"ENQUIRY_EMAIL",allowed_destination_addresses:["inbox@studio.example"]}],ratelimits:[{name:"ENQUIRY_RATE_LIMIT"}]};
  assert.deepEqual(validateDeployment(live,publicSite),[]);
  assert.ok(validateDeployment({...live,send_email:[]},publicSite).length>0);
  assert.ok(validateDeployment({...live,ratelimits:[]},publicSite).length>0);
});
