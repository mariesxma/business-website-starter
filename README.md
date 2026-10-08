# Business website starter

A customizable React business website with a Cloudflare contact-form backend, fictional visual examples, and an optional D1 resource catalogue.

## Start locally

```sh
npm ci
cp .dev.vars.example .dev.vars
npm run dev
```

Use Node.js 24. Open the address printed by the server. No email account or database is needed for the default demo. Form submissions are validated but are not emailed or saved to a database in demo mode.

## Included

- Responsive homepage, services, about, contact, and policy worksheets.
- Central public identity, fictional service data, and original CSS artwork.
- Interactive workflow and layer diagrams, sample metric bars, timeline, and estimator.
- Contact validation, bounded payloads, same-origin checks, honeypot, rate limiting, and configurable email delivery.
- Optional read-only D1 catalogue with migrations and fictional seed data.
- Unit and production-render tests, GitHub Actions, and a template-content scan.

The application uses React, Next.js-compatible route conventions, Vinext/Vite, and Cloudflare Workers. This is not a stock Next.js hosting setup. It has no login, payments, admin dashboard, or private customer database.

## Make your own copy

After the implementation pull requests are merged into the default branch, choose **Use this template** on GitHub. Set your own branding and domain, replace the sample pages and policy worksheets, then configure only the backend services you need.

The original project history, business copy, logos, customer information, and deployment identifiers are not included. Reused code retains its required license attribution.

## Guides

- [Local setup](docs/getting-started.md)
- [Customization](docs/customization.md)
- [Deployment and email](docs/deployment.md)
- [Optional database](docs/database.md)
- [Architecture](docs/architecture.md)
- [Accessibility review](docs/accessibility.md)
- [Contribution guide](CONTRIBUTING.md)
- [Implementation sequence](docs/implementation-sequence.md)

## Verify

```sh
npm run check:template
npm run check
npm run test:render
```

`npm run check:config` intentionally rejects the untouched demo settings. Once your identity, domain, and delivery mode are configured, `npm run deploy` validates settings, builds, and deploys to your own Cloudflare account.

## License

New starter code uses the repository's Apache-2.0 license. Adapted components retain their MIT license; see [NOTICE.md](NOTICE.md) and [the upstream notice](licenses/upstream-MIT.txt).
