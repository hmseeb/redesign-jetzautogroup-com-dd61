# Sacramento Towing Services — Website

A complete redesign of the towing & roadside assistance website, rebuilt from scratch in
vanilla HTML, CSS and JavaScript. No build step, no dependencies.

## Business

- **Name:** Sacramento Towing Services
- **Phone:** [916-628-8646](tel:9166288646)
- **Email:** jetzauto@gmail.com
- **Address:** 5824 Manzanita Ave, Carmichael, CA 95608, United States
- **Hours:** Available 24/7

## Services

1. Light & Medium Duty Towing
2. Roadside Assistance (lockouts, fuel delivery, tire support, emergency towing)
3. Tire Changes
4. Jumpstarts

## Service areas

Sacramento, Fair Oaks, Citrus Heights, Arden-Arcade, North Highlands, Rancho Cordova,
Roseville, Rocklin, Folsom, El Dorado Hills, West Sacramento, South Sacramento, Elk Grove,
Antelope, Elverta, Mather, Orangevale and Carmichael.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Single-page site: hero, about, values, services, why-us, areas, FAQ, gallery, contact, footer |
| `styles.css` | Design system (charcoal + high-visibility amber), layout and responsive rules |
| `script.js` | Mobile nav, sticky header, scroll-spy, FAQ accordion, scroll reveal, gallery lightbox |
| `favicon.svg` | Tow-truck mark used as the site favicon |

## Features

- Semantic HTML5 with a skip link, ARIA labels and keyboard-accessible components
- Open Graph / Twitter meta tags plus `AutoWrecker` JSON-LD structured data
- Fully responsive down to small phones, with a sticky "Call Now" bar on mobile
- Accessible gallery lightbox (arrow keys, Escape, focus restore)
- `prefers-reduced-motion` support

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
