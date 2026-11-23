# Villa Relax feature inventory

Inspected again on 23 Nov 2026, desktop 1280 and mobile 390, every template in the sitemap: home, villa, gallery, prices, area, inquiry, and the four guide articles. Locales on that site are HR, EN, DE, DE-AT, IT, SL, and CS. Ulika keeps HR, EN, DE, and IT.

Ulika uses its own name, gold sun mark, stone and olive colours, its own photographs, and the owner’s text. Villa Relax wording, photos, logo, and contacts are not copied.

| Feature | On Villa Relax | On Ulika | Reason if not the same |
| --- | --- | --- | --- |
| Sticky header, wordmark, place line | Yes | Done | Gold sun icon from this site, not the Relax logo |
| Header inquiry button | Yes | Done | |
| Nav hover colour | Yes | Done | Olive hover, clay for the current page |
| Mobile menu | Yes | Done | |
| Language menu | 7 locales | Done for 4 | AT, SL, and CS are not Ulika locales |
| Full-height photo hero with srcset | Yes, one eager photo | Done | `next/image`, priority, `sizes="100vw"`. WebP and AVIF when sharp is present |
| Hero inquiry card with dates | Yes | Done | Continues to the existing inquiry form |
| Fact strip under the hero | Yes, six figures | Done for four | Stars, 8 guests, 4 bedrooms, pool 8 × 4 m. House size, garden size, and bathroom count are not stated the same way in the owner text, so they are not shown |
| Five-star display | Yes, with a count | Done, stars only | The owner’s five stars stay. No review count was added |
| Review quotes, names, dates | Yes | Not done | No review texts exist for Ulika. None were invented |
| Icon cards for amenities, hover lift | Yes | Done | Owner’s amenity list and order. Lift is disabled when reduced motion is requested |
| Show more, text kept in HTML | Yes | Done | Accessible details and the existing expand control |
| Photo mosaic and gallery | Yes | Done | |
| Gallery filters | Yes, all / pool / inside | Not done | The Ulika files are numbered photographs without a room label, so a filter would be a guess |
| Lightbox with a short fade | Yes | Done | Keyboard arrows and Escape. Fade is off when reduced motion is requested |
| Gallery loads the first screen, then the rest | Lazy images | Done | First 24 photographs, then Show more for the remaining files |
| Price calendar | Yes | Done | Owner’s 426 daily amounts. A slash stays an empty day |
| Stay estimate from selected dates | Yes | Done | Sums only listed amounts |
| Named season table and a later year | Yes | Not done | The Ulika file is daily through December 2027, not season bands, and it has no 2028 prices |
| Booking rules | Yes | Done | Unchanged owner terms: 30%, 500 € deposit, 16:00 / 09:00, no pets, listed payment methods |
| How to book, three steps | Yes | Done on home, prices, and inquiry | Owner’s existing three steps |
| FAQ accordion and FAQPage schema | Yes | Done | Questions use the published bedrooms, pool paragraph facts, wellness items, payment terms, deposit, times, pets, smoking, parking, and the charger. No minimum-stay question, because the price file does not state one |
| Distances | Yes | Done | The existing kilometre list, unchanged |
| Map and pin | Yes | Done | The existing map embed, unchanged |
| Surroundings as cards | Yes, many named places | Done for the published list | The owner’s visit lines are cards. Beaches, restaurants, and events that are not in that list were not added |
| Planning guides | Yes, four articles | Done, two | Pool page quotes the owner’s 8 × 4 m paragraph. Family page lists the family amenities. No extra article was written for places or group size that the text does not cover |
| Also-see links | Yes | Done | Villa, pool guide, family guide, surroundings |
| Inquiry form | Yes | Done | Existing translated form, unchanged fields |
| Phone and email | Yes | Done | Unchanged numbers and email |
| WhatsApp button | Yes | Not done | No WhatsApp number is published for Ulika |
| Sticky mobile bar | One “Send inquiry” button | Done | Call, inquiry, and email. The published numbers stay |
| Closing inquiry band | Yes, on content pages | Done | |
| Footer columns: pages, guides, contact | Yes | Done | Same contact lines, Vodnjan only, no street. Official Vodnjan and Istria links stay |
| Breadcrumbs and BreadcrumbList | Yes | Done | |
| hreflang, x-default, canonical, sitemap | Yes | Done | Guides are included. `/admin` is omitted |
| VacationRental and LodgingBusiness | Yes | Done | No aggregateRating |
| Open Graph image on the canonical domain | Yes | Done | `https://www.villaluxulika.com/assets/images/i/105.jpg` |
| Button and image transitions, reduced motion | Yes | Done | 150–300 ms hover. `prefers-reduced-motion` turns them off |
| Host dashboard | No | Done | `/admin`, carried from this branch |
