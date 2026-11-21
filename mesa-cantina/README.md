# Mesa Cantina San Pedro: website

A static marketing site for Mesa Cantina San Pedro, the beachfront restaurant and cantina about half a mile north of the bridge in San Pedro, Ambergris Caye, Belize (formerly Mesa Cafe and Mesa Bistro). It is built for tourists deciding on a phone where to eat today: what's good, when it's open, how to get there, how to book.

Plain HTML, CSS and a little JavaScript. No build step, no framework, no dependencies beyond Google Fonts.

## File map

```
index.html          Home
menu.html           Breakfast, lunch and dinner menu (prices illustrative until the owner supplies the real menu)
drinks.html         The cantina: cocktails, beer, wine, coffee
story.html          Mesa Cafe to Mesa Bistro to the beach
visit.html          Hours, directions (golf cart, water taxi), map
events.html         Private events, groups, weddings
reserve.html        Booking form (front end only, see "Booking backend")
gallery.html        Photo slots with shot lists for the photographer
404.html            "This dock doesn't go anywhere" not-found page (noindex)
_shell.html         Page template every page was built from. Not linked; blocked in robots.txt

css/mesa.css        Design system: tokens, type, buttons, header, footer, forms, .tbd marker
js/mesa.js          Mobile nav, live "open now" tide strip (Belize time), scroll reveal

assets/             logo-mark.svg, logo-full.svg, logo-full-reverse.svg, favicon.svg, og-image.svg
assets/icons/       Inline-style SVG icons (pin, clock, phone, whatsapp, ...)
assets/img/         Real photos go here when they exist

seo/head-snippets.html  Exact <head> tags (title, description, canonical, Open Graph, Twitter) for each page,
                        plus the Restaurant JSON-LD block for the home page
seo/schema.json         The same Restaurant structured data as standalone JSON
robots.txt, sitemap.xml, site.webmanifest

BRIEF.md, PRODUCT.md    Build brief and confirmed facts (internal; do not need to be deployed)
```

## Preview locally

From this folder:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000/. Use the server rather than opening files directly: `404.html` uses `<base href="/">` so it works at any missing URL, and that only resolves correctly over http. To see the 404 page, open http://localhost:8000/404.html (Python's server does not serve it for missing paths; Netlify and Cloudflare Pages do).

## Before launch: what the owner must confirm

Everything unconfirmed is wrapped in `<span class="tbd">` on the pages, which shows as an orange dashed highlight. Nothing should go live with a visible `.tbd`. To list every one:

```sh
grep -n 'class="tbd"' *.html
```

<!-- TBD-LIST-START -->
Collected from `grep 'class="tbd"' *.html` on 2026-11-21 (53 markers across 8 pages; re-run the grep after any edit). Grouped by topic, with the page(s) where each appears.

### Location and getting there
1. **Exact street address**, turn-off and landmark; map pin / GPS (then add `geo` to the JSON-LD). *index, visit*
2. **Water taxi**: does Mesa have its own dock, which is the nearest stop, mooring details for private boats. *index, visit*
3. **Golf cart**: drive time from the bridge, where to park, how many carts, free for guests? *visit*
4. Is the **beach walkable** the whole way from town? *visit*

### Hours and policies
5. **Hours** Tue–Sun 8am–9pm, closed Monday (from public listings); kitchen vs bar close times; holiday hours. Also hard-coded in `js/mesa.js` (`HOURS`, `MEALS`), every footer and `seo/schema.json`. *index, visit*
6. **Walk-ins** welcome? Group size that needs a booking; large-party policy. *visit, reserve*
7. **Reservations**: the three seating areas offered on the form exist and can be requested; table hold time; usual reply time. *reserve*
8. **Kids** (menu options, high chairs), **dogs** (sand/deck, on a lead), **accessibility** (step-free entrance, firm-floor seating, accessible restroom), **guest Wi-Fi**. *visit*
9. **Payment**: which cards, any surcharge or minimum, change given in BZ$? US$ at 2:1. *visit*
10. **Phone / WhatsApp** +501 621-6226 (one number for both?). *every page*

### Menu and drinks
11. **Full food menu and BZ$ prices**: all dishes and prices shown are illustrative. *menu, index*
12. **Drinks list and prices**; happy hour days, times, pours and prices. *drinks*

### People, story and reviews
13. **Mandy and Kevin**: confirm names, roles and a short bio in their own words (how they came to San Pedro, the dish they eat themselves). *index, story*
14. **History**: year Mesa Cafe opened (Vilma Linda Plaza, Tarpon St), where and when Mesa Bistro ran and what changed, year of the move to the beach, one detail regulars remember. *story*
15. **TripAdvisor**: confirm the ~4.8 rating and review count (listing d2559450). *index*
16. **Review quotes**: every quote is a placeholder. Replace with real reviews (reviewer name, month/year, platform) the owner is happy to show. *index, story*

### Events
17. Weekly programme (nights, times, acts) is sample copy. *events*
18. Seated group capacity, standing/full-buyout capacity, how far ahead to book (suggested 2+ weeks). *events*
19. **Event package pricing** in BZ$. *events*
20. **Email address** `events@mesacantinasanpedro.com` is assumed: confirm or replace (it is also the target of the enquiry form's mail link). *events*

### Photos, social and launch
21. **Photo shoot date**; owner picks the hero lunch dish. Every `.photo-slot` caption is the shot list; replace slots with real photos (WebP/JPG, width/height set, `loading="lazy"` below the fold). *gallery and all pages with photo slots*
22. **Instagram handle** (only Facebook is confirmed). *gallery*
23. **Domain**: `https://www.mesacantinasanpedro.com/` is a placeholder in `seo/head-snippets.html`, `seo/schema.json`, `sitemap.xml` and `robots.txt`.
24. **OG image**: export `assets/og-image.svg` to a 1200x630 JPG/PNG and update `og:image` / `twitter:image`.
<!-- TBD-LIST-END -->

## SEO checklist

- Paste each page's block from `seo/head-snippets.html` into its `<head>` (replacing the shell's title and description), and the JSON-LD into `index.html`.
- Add `<link rel="manifest" href="site.webmanifest">` to every page's `<head>`.
- After launch: submit `sitemap.xml` in Google Search Console, and claim/update the **Google Business Profile** (it matters more than anything on this site for "best breakfast San Pedro Belize" searches). Keep name, address, phone and hours identical across the site, Google, TripAdvisor and Facebook.
- Do not add `aggregateRating` markup to the site's own schema. Google treats self-served ratings as against its guidelines.

## Deploy

The site is a folder of static files, so any static host works. Two free options that also serve `404.html` automatically:

**Netlify**: log in at app.netlify.com, open "Sites", and drag this whole folder onto the "deploy manually" drop zone. Then Domain settings > add the custom domain and follow the DNS steps. HTTPS is automatic.

**Cloudflare Pages**: dash.cloudflare.com > Workers & Pages > Create > Pages > "Upload assets", name the project, drag the folder in, deploy. Then Custom domains > add the domain.

To update the site, drag the folder in again (Netlify: Deploys tab; Cloudflare: Create new deployment). `BRIEF.md`, `PRODUCT.md`, `_shell.html` and `.impeccable/` don't need to be uploaded.

## Booking backend

`reserve.html` (form `#book-form`) validates in the browser, then hands the request to WhatsApp (wa.me/5016216226) for the team to confirm by hand; there is no server. Its comment block near the top of the page has OpenTable/Resy wiring notes. The enquiry form on `events.html` (`#event-form`) hands off to email or WhatsApp. Options, simplest first:

1. **Netlify Forms** (if hosting on Netlify): add `data-netlify="true"` and a `name` attribute to the `<form>`. Submissions are emailed to the owner. No code.
2. **Formspree / Basin / Web3Forms**: set the form's `action` to the service's endpoint and `method="post"`. Works on any host, including Cloudflare Pages.
3. **WhatsApp hand-off**: on submit, build a `https://wa.me/5016216226?text=...` link from the form fields so the request lands in the restaurant's WhatsApp. Zero infrastructure, but needs staff to reply.
4. **A real reservations system** (OpenTable, Resy, SevenRooms, Tock, or a Belize-friendly option like a Google Calendar booking page): replace the form with their embed or a "Book a table" button linking to their page, and keep the phone/WhatsApp fallback.

The submit handler lives in the page's own `<script>` on `reserve.html`. Whichever route is chosen, show a clear confirmation message and tell guests that a booking is only final once the restaurant confirms it.
