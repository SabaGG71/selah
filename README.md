# selah

The new [selah.coffee](https://selah.coffee): a rebuild of Selah Coffee Co.'s WordPress site (mobile coffee cart and espresso bar catering in Denver, Colorado), made by LocalEyes.

- Next.js 16 (App Router), Tailwind CSS 4, TypeScript, shadcn/ui
- Every URL of the live WordPress site is kept at the same path with its trailing slash, so the switch needs no page redirects. The URL inventory and the few WordPress-only redirects to add at launch are in `docs/migration.md`.
- The homepage keeps the live site's headings and copy, in its order, with the quote form moved up to section 3.
- The service-area map uses Leaflet with OpenStreetMap tiles, so it needs no API key.

## Run it

```bash
npm install
npm run dev -- -p 3001
```

Then open http://localhost:3001.
