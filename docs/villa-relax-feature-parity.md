# Villa Relax feature inventory

Source inspected: https://villarelaxpula.com (public HTML and sitemap, 23 November 2026).

Locales on Villa Relax: HR (`/`), EN (`/en/`), DE (`/de/`), DE-AT (`/at/`), IT (`/it/`), SL (`/sl/`), CS (`/cs/`). Ulika already has HR, EN, DE, and IT only. Extra Relax locales are not added.

This list is an inventory of features, not permission to copy Villa Relax’s logo, palette, name, text, photos, reviews, or contact details.

| Feature | On Villa Relax | Ported to Ulika | Note |
| --- | --- | --- | --- |
| Sticky header with wordmark and place line | Yes | Yes | Ulika wordmark and “Vodnjan · Istra”. No Relax logo. |
| Desktop inquiry button in the header | Yes | Yes | Links to the Ulika inquiry page. |
| Mobile menu | Yes | Yes | |
| Language menu | Yes, 7 locales | Yes, 4 locales | HR, EN, DE, IT only. |
| Skip link and visible focus | Yes | Yes | |
| Breadcrumbs on inner pages | Yes | Yes | |
| Full-height photo hero | Yes | Yes | Ulika photo and stone/olive treatment. |
| Hero badge and one-sentence lead | Yes | Yes | Facts from the Ulika documents. |
| Hero inquiry card (dates, then the form) | Yes | Yes | Guest-entered dates. No guest-capacity claim. |
| Short trust lines under the hero | Yes | Yes | Only facts already on the Ulika site or in the documents. |
| Fact chips with numbers | Yes | Yes | Only documented numbers: 4 bedrooms, pool 8×4 m, table for ten. No guest count, floor area, or garden area. |
| “Why this villa” icon cards | Yes | Yes | Pool, wellness, kitchen, library, children, arrival. |
| Photo mosaic and “all photos” link | Yes | Yes | Existing Ulika photographs. |
| Gallery page | Yes | Yes | `/photogallery`, not Relax’s `/galerija` path. |
| Lightbox (click to enlarge, next/previous, Escape) | Yes | Yes | |
| Guest reviews and star rating | Yes, Airbnb excerpts and 4.81 / 78 | No, hidden | No real Ulika reviews or counts exist in the repo or on the current site. The section is not rendered. |
| Price teaser (“from” the lowest listed night) | Yes | Yes | Lowest listed daily amount in the Ulika file is 190. Euro is the currency already stated on the old Ulika site. |
| Season colour key and period price table | Yes | Partial | Ulika’s file is one amount per day, not named seasons. The calendar shows each day. A made-up season table is not shown. |
| Availability calendar | Yes | Yes | Same data the host edits in `/admin`. Closed days and unpriced days are distinct. |
| Click arrival and departure, then a stay estimate | Yes | Yes | Sum of listed nightly amounts. If a night is closed or unpriced, the estimate says so. |
| Year switcher for a second price year | Yes, 2028 copied from 2027 | No | Ulika’s file ends in December 2027. No second year was invented. |
| Reservation rules | Yes | Yes | Only the rules already published on the old Ulika site, plus the pool-cover rule from the new description. |
| How-to-book steps | Yes, three steps | Yes | |
| FAQ accordion | Yes | Yes | Answers use Ulika facts only. Questions that need a missing fact are omitted. |
| Location section | Yes | Yes | “Edge of Vodnjan, Istria.” No street and no OIB. |
| Map | Yes, property pin and address | Partial | A town map of Vodnjan loads only after a click. No house pin and no street. |
| Surroundings / area page | Yes, with distances, sights, beaches, food, events | Partial | Page exists. Distances, restaurants, and events are omitted because Ulika has no such facts. |
| Planning-guide / SEO articles | Yes, four articles | Partial | Two articles built from the documents: heated pool, and the children’s corner. Large-group and beach-distance articles are not created. |
| Inquiry page and form | Yes | Yes | Existing owner email delivery. Guest can enter dates. |
| Phone, email, and WhatsApp buttons | Phone, email, WhatsApp styling | Partial | Phone and email from the existing Ulika site. No WhatsApp number is in the repo, so no WhatsApp button. |
| Sticky mobile contact bar | Yes | Yes | Call and email. |
| Footer with contact and links | Yes | Yes | No street address. |
| Direct-from-owner wording | Yes | Yes | The existing site already says the inquiry goes to the owner. |
| SEO: title, description, canonical, hreflang, Open Graph | Yes | Yes | Open Graph image is an absolute URL on `https://www.villaluxulika.com`. |
| Sitemap | Yes | Yes | Ulika locales and pages. `/admin` excluded. |
| Structured data | Yes | Yes | VacationRental and LodgingBusiness. No rating, no street. |
| Descriptive image alt text | Yes | Yes | |
| Optimised images | Yes | Yes | `next/image`, fixed aspect ratios. |
| Host dashboard | No public dashboard on Relax | Yes, kept | `/admin` from round 1. |
