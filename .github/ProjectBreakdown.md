# Project Breakdown

## Project Overview
This project (Cardfolio) is a frontend-only credit card aggregator. Users link accounts from many issuers and see transactions, account summaries, and spending analytics for all of them together, using mock data. It is not a credit card issuer or bank site.

There is no real backend, API server, database, or authentication system in this project. The `Backend/` folder is a mock-data layer that the frontend uses as its source of data.

## Repository Structure

### Frontend
The frontend will be built using React and should follow this structure:
- `Frontend/pages/`
- `Frontend/components/`
- `Frontend/services/`

### Pages
There should be a page file for each major screen. Page files should be named consistently, for example:
- `HomePage.tsx`
- `TransactionsPage.tsx`
- `AnalyticsPage.tsx`
- `AddAccountPage.tsx`

These files should live under `Frontend/pages/`.

### Components
Feature-specific UI should be created as reusable components and placed in `Frontend/components/`.

Examples include:
- cards
- filters
- tables
- charts
- transaction rows
- account widgets

### Services
Reusable logic should be centralized in `Frontend/services/` to avoid duplication. This may include helper functions for formatting currency, filtering data, transforming arrays, or preparing mock data for views.

### Backend
The backend layer is intentionally simple and static:
- `Backend/data/`

This folder contains mock data such as the institutions that can be linked, their accounts, transactions, and categories. The frontend reads from this mock data instead of calling an API.

## Implementation Constraints
- No real backend implementation should be created unless the user explicitly asks for one.
- No database setup is required.
- No API endpoints are required.
- No external service integration is required.
- The repository may start empty, and these folders may be referenced before they are created.
