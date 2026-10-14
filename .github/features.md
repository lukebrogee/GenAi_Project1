# Features

## Project Scope
This project (Cardfolio) is a frontend credit card aggregator using mock data only. Users link accounts from multiple issuers and view their combined activity and analytics, without a real backend or live data source. It is not an issuer or bank website.

## Home Page
The home page will consist of multiple Cards (blank page sections that hold components). The first card will be a greeting message such as "Good Afternoon, Luke." The next card will display recent transactions. The next card will show summaries of the linked accounts (credit card widgets).

## Transactions Page
This page will show all transactions across the mock accounts. It will include a filter bar for selecting credit cards, categories, dates, and other sorting criteria. Below the filters will be a sortable table of transactions. The table should support sorting by each column, such as amount or date, and show a paginated list of rows. Important details include date, transaction description, company, amount, category, and account reference.

## Analytics
This page will show spending habits and financial summaries. It may include charts, totals, category breakdowns, spending by account and merchant, and aggregate trends across all linked accounts based on the mock dataset. The goal is to provide a clear overview of spending behavior across accounts.

## Add Account
This page lets the user link accounts from card issuers, in the style of Plaid Link. The user picks an institution, goes through a simulated sign-in and account-selection flow, and the prepared mock accounts and transactions for that institution then appear across the app. Linked institutions are listed with an option to unlink them. Nothing connects to Plaid or a real bank; the linked set is kept in `localStorage`.

## Data Constraint
All data used by the application should come from the mock data layer in `Backend/data/`. There should be no request flow to a real server or API unless explicitly requested later.
