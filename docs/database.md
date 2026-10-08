# Optional public resource catalogue

The website and contact form work without a database. `/api/resources` returns 503 until a `DB` binding exists. The example stores public catalogue items, not contact submissions.

Create your own database:

```sh
npx wrangler d1 create business-starter
```

Copy the returned database ID into a top-level `d1_databases` entry in `wrangler.jsonc`:

```json
[
  {
    "binding": "DB",
    "database_name": "business-starter",
    "database_id": "YOUR_DATABASE_ID",
    "migrations_dir": "db/migrations"
  }
]
```

Apply the checked-in migration and fictional seed locally:

```sh
npx wrangler d1 migrations apply business-starter --local
npx wrangler d1 execute business-starter --local --file=db/seed.sql
```

Start the app and visit `/api/resources`. Only the two published sample records should appear; the unpublished record is excluded. Apply migrations to your own remote database with the same command using `--remote` instead of `--local`. Seed remote data only if you want the fictional examples there.

The route supports GET only, returns at most 50 records, and caches successful responses for 60 seconds. Do not add private data to published records. There is no admin interface or authentication system. Add appropriate access controls before building any management or private-data feature.

`db/schema.ts` is a Drizzle representation of the table. The initial migration is hand-written; do not blindly apply a newly generated create-table migration to an existing database. Review migration output and test it against a local copy first.
