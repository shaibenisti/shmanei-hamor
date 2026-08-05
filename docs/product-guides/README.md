# Product guides — source sheets

The Hebrew information sheets Limor hands out with the products (סגולות, אופן
השימוש, אזהרות). They are the **source material only** — the site never reads
these files at runtime.

The customer-facing copy lives, transcribed and structured, in
[`src/data/productDetails.ts`](../../src/data/productDetails.ts) and is rendered
by `ProductDetailDialog`. When a sheet changes, update the `.txt` here **and**
the matching entry in `productDetails.ts`.

| File | Product (`Product.id`) |
| --- | --- |
| `deep-skin-oil.txt` | `deep-skin-oil` |
| `mouth-oil-kit.txt` | `mouth-oil-kit` |
| `calming-oil.txt` | `calming-oil` |
| `herbal-infusion.txt` | `herbal-infusion` |
| `general-healing-oil.txt` | `general-healing-oil` |
| `hormonal-calm-oil.txt` | `hormonal-calm-oil` |
| `oil-perfume.txt` | `oil-perfume` |
| `face-oil.txt` | `face-oil` |
| `general-skin-information.txt` | — background reading, **not** shown on the site |

`general-skin-information.txt` is a general explanatory sheet rather than a
product insert, so it is kept here for future use (a future article / about
page) and deliberately has no entry in `productDetails.ts`.
