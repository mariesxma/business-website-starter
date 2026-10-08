# Run locally

Use Node.js 24 (see `.nvmrc`). From your copy of this repository:

```sh
npm ci
cp .dev.vars.example .dev.vars
npm run dev
```

Open the address printed by the development server. The homepage, services, about, contact, and visual examples need no database or email account.

Try the contact form with fictional details. The default mode validates the form, then explicitly reports that no email was sent and nothing was stored in a database. Provider request metadata can still be logged. The application never logs enquiry bodies.

Run `npm run check` before proposing changes. Production builds go into `dist/`. Keep `.dev.vars`, dependency folders, and build output out of Git.

`npm run check:config` deliberately fails on the untouched template. Customize the public identity and hosting settings before deployment.
