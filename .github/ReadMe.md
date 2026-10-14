# Project Description

**Cardfolio** is a frontend-only credit card aggregator. Users link accounts from many issuers (American Express, Discover, Chase/Visa, Capital One/Mastercard, etc., in the style of Plaid Link) and then see spending analytics, account activity, and transaction history for all of those accounts together in one place.

This is **not** a bank or credit card issuer website. It never issues cards; it only brings in accounts users already have elsewhere.

## Core Requirements
- The app is a website, not a mobile app.
- The project uses mock data only.
- There is no real backend, database, or API server.
- All displayed data comes from static files in `Backend/data/`.
- Linking an account is simulated: `Backend/data/` contains prepared accounts and transactions for each institution a user can link, and nothing connects to a real Plaid or bank API. Which accounts are linked is stored in the browser's `localStorage`.
- Cards are layout containers: a Card is a blank, pre-formatted section of a page that accepts other components as children.

## Planned Structure
- `Frontend/` for the user interface and UI logic.
  - `Frontend/pages/` for page-level screens.
  - `Frontend/components/` for reusable UI elements.
  - `Frontend/services/` for reusable helper logic.
- `Backend/` for mock data only.
  - `Backend/data/` for transaction, account, and category data.

## Development Rules
- The repository may begin empty and should still reference the expected project folders.
- Agents must not assume a backend exists unless it is explicitly added later.
- The app should focus on usable dashboard functionality, clear layout, and realistic mock-data interactions.
- Any implementation should follow the project structure above and remain consistent with the mock-data-only direction.
