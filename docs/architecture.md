# How the application works

The source uses React and Next.js-compatible App Router conventions. Vinext and Vite build it for a Cloudflare Worker. This is not a stock `next build` deployment.

- `app/`: routes, layouts, and reusable frontend components.
- `config/`: public identity and fictional service data.
- `lib/`: shared enquiry validation and plain-text mail composition.
- `worker/`: API routing, bounded request parsing, origin checks, rate limiting, and delivery.
- `db/`: optional public catalogue schema, migration, seed, and query.
- `tests/`: backend behavior and production-render checks.

Contact flow: browser validation → Worker origin check → rate limit → bounded JSON parser → honeypot and field validation → demo result or email-provider acceptance. The browser cannot choose the recipient. No form body is logged or stored by the application.

The database route is independent of the contact flow. Disabling D1 does not disable pages or email.

No login, payments, admin dashboard, file uploads, analytics, or private customer records are implemented. Extend only the parts you need. Keep secrets on the Worker side and validate untrusted input there even if the browser already checks it.
