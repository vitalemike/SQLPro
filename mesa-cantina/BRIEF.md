# Build brief for every agent (read fully before writing)

Client: Mesa Cantina San Pedro: a beachfront restaurant and cantina on Ambergris Caye, Belize. Facts are in PRODUCT.md. Mark anything unconfirmed with <span class="tbd">…</span>. NEVER invent testimonials. Any quote is a labelled placeholder: <span class="tbd">[Placeholder: pull a real TripAdvisor review]</span>.

## World: "The Dock"
Island-modern cantina. The page is the walk down a sun-bleached San Pedro dock to a table on the sand. Material: bleached plank ground (--plank), reef turquoise (--reef) as the committed brand colour that carries big bands of the page, buoy orange (--buoy) ONLY for primary actions and the stencil signature, and deep reef night (--reef-deep) for the evening cantina. Type: Big Shoulders Display (uppercase, painted-sign/stencil feel) for headings; Instrument Sans for body.
Signature: `.stencil` numerals, like painted mooring/slip numbers on a dock post. Use them ONLY where a number carries meaning (times like 8AM, prices, distance ½ MI, the 4.8 rating). Never use them as decorative section numbering.
Motion: one moment per page at most. Add `data-reveal` to a few major blocks; js/mesa.js handles it. No scattered hover gimmicks.

## Hard rules (Impeccable craft floor)
- Start from `_shell.html`: copy it exactly (head, tide strip, header/nav, footer) and replace only the title, description and the main content. Keep `<link rel=stylesheet href="css/mesa.css">` and `js/mesa.js`. Page-specific CSS goes in one <style> block in <head> and uses tokens only (var(--…)). No new colours or fonts.
- BANNED: eyebrow/kicker labels above headings; gradient text; glass decoration; coloured border-left/right >1px; hard offset shadows; emoji or unicode used as icons; rows of identical icon+heading+text cards as the page structure; nested cards; 01/02/03 section numbers; hero-metric template; stock "Lorem ipsum".
- Icons: inline SVG, 1.75px stroke, round caps, currentColor, 24px viewBox. Or reference assets/icons/<name>.svg (agent 8 creates them: pin, clock, phone, whatsapp, golfcart, boat, fork, glass, coffee, sun, moon, leaf, calendar, users, arrow-right, facebook, instagram, star).
- Imagery: there are no photos yet. Do NOT hotlink stock. Use art-directed photo slots: `<figure class="photo-slot" style="aspect-ratio:4/5"><svg …></svg><figcaption>Shot list: …</figcaption></figure>`. Each slot holds an authored SVG scene in the palette (horizon line, dock planks, palm silhouette, sun) and a caption telling the photographer exactly what to shoot. Define .photo-slot in your page <style>: background var(--reef) or var(--plank-2), radius var(--radius), overflow hidden.
- Accessibility: semantic landmarks, one h1, alt text, labels on every input, 4.5:1 contrast, 48px tap targets, visible focus (already in CSS), works at 360px with no horizontal scroll.
- Copy: warm, confident, specific, short sentences, island voice without cliché ("paradise", "hidden gem", "tropical oasis" are banned). Name real things: the bridge, golf carts, water taxis, the reef, sundown, coconut French toast, BZ$ prices.
- Prices: show as BZ$ with tabular numerals, and mark the menu as illustrative until the owner supplies the real one (one .tbd note at the top of the menu, not on every line).
- Phone +501 621-6226, WhatsApp https://wa.me/5016216226, Facebook https://www.facebook.com/mesasanpedro/. Hours Tue–Sun 8am–9pm, closed Monday.
- Write ONLY the files assigned to you. Do not edit css/mesa.css, js/mesa.js, _shell.html, or other agents' files. When done, report file paths and any assumption you made in under 120 words.
