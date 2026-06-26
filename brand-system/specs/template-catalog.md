# Template Catalog v1

Templates use a fixed 512 x 512 px canvas for OneKey social outputs, together with OneKey green `#3BD23D`, black `#000000`, white `#FFFFFF`, and official OneKey logo assets. Borders, inset cards, image areas, logo placement, and text groups should align to clear axes with consistent spacing.

Use the `Social / Frame 512` behavior from the Figma example: 512 x 512 canvas, 448 x 448 safe area, and a 16 px outer border when a border or framed edge is used.

## `single-partner`

Use for one partner, project, token, chain, or two-logo relationship post.

Required fields:

- `headline`
- `cta`
- `items`

Limits:

- Chinese headline: 10 characters
- English headline: 32 characters
- items: 1-2

Approved variants:

- `logo-pair-panel`: headline above a white panel containing one or two large logo blocks
- `hero-logo`: one dominant partner logo with short headline and CTA
- `split-lockup`: OneKey and partner shown as a clear relationship pair

Do not use for lists of three or more items.

## `integration-grid`

Use for multiple comparable apps, chains, markets, tokens, features, or partners.

Required fields:

- `headline`
- `cta`
- `items`

Limits:

- Chinese headline: 18 characters
- English headline: 56 characters
- items: 2-8

Approved variants:

- `four-grid`: 2x2 or 4-column logo grid for 4 items
- `dense-grid`: 6-8 item grid
- `category-grid`: items grouped by a short category label

Do not use when one partner needs special emphasis.

## `guide-cover`

Use for educational, security, and explainer covers.

Required fields:

- `headline`
- `subheadline`

Limits:

- Chinese headline: 18 characters
- English headline: 48 characters
- subheadline: 56 characters
- items: 0

Approved variants:

- `quote-panel`: large headline plus simple supporting line inside a white panel
- `lab-cover`: Security Lab style with restrained patterning
- `definition-card`: for "What is ..." style explainers

Do not add dense body copy to the cover.

## `perps-market`

Use for perpetual contract, leverage, trading pair, or market support announcements.

Required fields:

- `headline`
- `subheadline`
- `marketPair`
- `leverage`
- `cta`

Limits:

- Chinese headline: 28 characters
- English headline: 64 characters
- subheadline: 72 characters
- items: 0

Approved variants:

- `market-badge`: trading pair and leverage with a large logo badge
- `ticker-panel`: pair-focused card with compact market details
- `feature-metric`: leverage or support status as the primary visual hook

Market numbers, fees, leverage, and dates must come from the source brief.
