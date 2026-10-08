# Deploy to your Cloudflare account

Use your own account and resources. The template contains no account ID, custom domain route, or existing resource identifier.

```sh
npx wrangler login
```

Choose a unique Worker `name` in `wrangler.jsonc`. Set the public domain in `config/site.ts` and `vars.SITE_ORIGIN`. Configure the hostname in your Cloudflare account. The configured origin must exactly match the browser origin; use HTTPS with no trailing slash in the variable. The default Workers subdomain can be used if you set it in both places.

## Email delivery

Demo mode never sends mail. To enable real delivery:

1. Configure Cloudflare email sending for your account and verify your sender and destination as required by the provider.
2. Add `CONTACT_TO` and `CONTACT_FROM` under `vars` with your own addresses, and set `BUSINESS_NAME`.
3. Add a top-level `send_email` array with `{ "name": "ENQUIRY_EMAIL", "allowed_destination_addresses": ["your verified destination"] }`.
4. Set `CONTACT_MODE` to `live`. All categories route to the one configured inbox; the selected category is included in the subject.
5. Keep the `ENQUIRY_RATE_LIMIT` binding. Missing or failed rate limiting blocks delivery.
6. Replace the policy worksheets and demo wording, then run `npm run check` and `npm run deploy`.
7. Submit a controlled test enquiry and confirm it reaches your inbox. A successful API response means provider acceptance, not guaranteed final delivery.

The frontend preserves input if delivery is uncertain. Avoid repeatedly retrying a timed-out submission until you check the inbox. Provider requirements can change; consult the current Cloudflare Email Sending documentation before activation.

## Rollback

Keep a known-good deployment. Use your Cloudflare dashboard deployment history to roll back, then verify the homepage and contact behavior. Never reuse another project's resource identifiers.

## Secrets

This starter requires no email API key. If you extend it with secret credentials, use `wrangler secret put NAME` and ignored local variables. Do not put secrets in `config/site.ts`, which is public.
