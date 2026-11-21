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
### Known items (from PRODUCT.md and BRIEF.md)

1. **Exact street address** and map pin / GPS coordinates. Currently "on the beach, ~0.5 mi north of the bridge". Also add `geo` to the JSON-LD once known.
2. **Opening hours**: Tue–Sun 8:00 AM–9:00 PM, closed Monday. Also hard-coded in `js/mesa.js` (`HOURS`) for the open-now strip, in the footer of every page, and in `seo/schema.json`.
3. **Meal periods** used by the open-now strip: breakfast 8–11, lunch 11–4, cantina 4–9 (`js/mesa.js`, `MEALS`).
4. **Phone** +501 621-6226 and **WhatsApp** wa.me/5016216226 (same number?).
5. **Facebook** URL facebook.com/mesasanpedro. Any Instagram account?
6. **The full menu with real BZ$ prices.** All menu and drinks prices are illustrative. Note that US$ is accepted at 2:1.
7. **Signature dishes and drinks** named on the site (coconut French toast is confirmed by reviews; anything else is a draft).
8. **Mandy and Kevin**: names and roles (owners? hosts?) and whether they want to be named.
9. **History dates**: when Mesa Cafe opened on Tarpon St (Vilma Linda Plaza), when it became Mesa Bistro, when it moved to the beach.
10. **TripAdvisor rating** (about 4.8/5, several hundred reviews, listing d2559450): confirm the current figure and the listing URL.
11. **Review quotes**: every quote on the site is a placeholder. Replace with real reviews the owner has permission to show, credited to the platform.
12. **Reservations**: does the restaurant take bookings, for which meals, and maximum party size? Who receives them (email, WhatsApp)?
13. **Events**: private hire capacity, minimum spend, buyout options, any regular nights (live music, trivia, specials).
14. **Getting there**: water taxi stop name, golf cart parking, wheelchair access to the sand.
15. **Payment**: cards accepted? US$ cash accepted at 2:1?
16. **Photos**: every `.photo-slot` has a shot list in its caption. Replace each slot with a real photo (WebP/JPG, width and height set, `loading="lazy"` below the fold).
17. **Domain**: `https://www.mesacantinasanpedro.com/` is a placeholder in `seo/head-snippets.html`, `seo/schema.json`, `sitemap.xml` and `robots.txt`. Find and replace once the real domain is registered.
18. **OG image**: export `assets/og-image.svg` to a 1200x630 JPG/PNG and update the `og:image` / `twitter:image` tags (social networks don't render SVG previews).
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

`reserve.html` (and the enquiry form on `events.html`) only collect and validate input in the browser. Nothing is sent until a backend is wired in. Options, simplest first:

1. **Netlify Forms** (if hosting on Netlify): add `data-netlify="true"` and a `name` attribute to the `<form>`. Submissions are emailed to the owner. No code.
2. **Formspree / Basin / Web3Forms**: set the form's `action` to the service's endpoint and `method="post"`. Works on any host, including Cloudflare Pages.
3. **WhatsApp hand-off**: on submit, build a `https://wa.me/5016216226?text=...` link from the form fields so the request lands in the restaurant's WhatsApp. Zero infrastructure, but needs staff to reply.
4. **A real reservations system** (OpenTable, Resy, SevenRooms, Tock, or a Belize-friendly option like a Google Calendar booking page): replace the form with their embed or a "Book a table" button linking to their page, and keep the phone/WhatsApp fallback.

The submit handler lives in the page's own `<script>` on `reserve.html`. Whichever route is chosen, show a clear confirmation message and tell guests that a booking is only final once the restaurant confirms it.
