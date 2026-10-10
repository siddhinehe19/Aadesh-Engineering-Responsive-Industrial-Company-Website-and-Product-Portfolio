# Aadesh Engineering website

A responsive static company-profile and components website built with React, TypeScript and Vite. It follows the supplied SRS: enquiries open WhatsApp, phone or email; the site does not include an API, database, account system or online checkout.

## Run locally

```sh
npm install
npm run dev
```

Create and preview a production build:

```sh
npm run build
npm run preview
```

## Content and asset updates

- Company contact and map-query details are defined in `src/App.tsx` in the `company` object. Confirm the WhatsApp number and exact postal address with Aadesh Engineering before launch; the source profile contains conflicting PIN codes, so neither is shown.
- The product catalogue is the `products` array in `src/App.tsx`. Product images are in `public/images/company/`; the existing images were supplied in the company profile presentation.
- Product descriptions do not claim unprovided materials, dimensions, prices or delivery times. Product specifications are identified as indicative and confirmed at order.
- Update copy only with company-approved information. Customer names and logos are intentionally not published.
- The supplied ISO 9001:2015 certificate is linked from the quality section at `public/documents/iso-9001-certificate.pdf`.

## Before production deployment

- Replace `https://example.com/` in `public/robots.txt` and `public/sitemap.xml` with the final company-owned HTTPS domain.
- Confirm that the company mobile number supports WhatsApp and that it is monitored for enquiries.
- Verify the address and Google Maps pin, and review all contact details with the company.
- Deploy the `dist/` directory to a static HTTPS host. Configure that host to serve `public/404.html` for missing pages and enable standard security headers where supported.
- The privacy notice describes the WhatsApp enquiry hand-off, embedded Google Maps and the absence of analytics. If analytics or a third-party form service is added, update it before enabling that service.

## Project layout

- `src/App.tsx` — page content, navigation, product filtering/details and WhatsApp enquiry links.
- `src/App.css`, `src/index.css` — responsive styling and interaction states.
- `public/images/company/` — product and facility photos extracted from the supplied company profile.
- `public/documents/` — supplied ISO 9001:2015 quality certificate.
- `public/robots.txt`, `public/sitemap.xml`, `public/404.html` — static-host SEO and fallback files.
