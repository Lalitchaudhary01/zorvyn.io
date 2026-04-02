# Pulse Finance Dashboard

A clean and interactive finance dashboard UI built for the frontend assignment using Next.js App Router and React.

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## What This Includes

- Dashboard overview with summary cards for total balance, income, expenses, and filtered transaction count
- Time-based balance trend visualization
- Categorical spending breakdown visualization
- Transaction list with search, filtering, sorting, and empty states
- Frontend-only role simulation
  - `Viewer` can explore data
  - `Admin` can add and edit transactions
- Insights section with highest spending category, month-over-month expense comparison, and a useful spending observation
- Local state management with React hooks
- Local storage persistence for transactions, selected role, and theme
- Responsive design for desktop and mobile
- Optional enhancements included
  - Dark mode toggle
  - JSON and CSV export

## Approach

This submission keeps the implementation frontend-focused and intentionally lightweight:

- Mock financial data is used instead of a backend
- UI logic, filters, theme, and role handling are managed on the client
- Charts are custom-built with simple SVG and CSS instead of a charting library
- The design uses layered surfaces, strong typography contrast, and subtle motion to feel more polished than a default admin panel

## Assignment Mapping

### 1. Dashboard Overview

- Summary cards: total balance, income, expenses
- Time-based visualization: balance trend
- Categorical visualization: expense breakdown by category

### 2. Transactions Section

- Each item shows date, amount, category, and type
- Includes search, category/type filters, and sorting

### 3. Basic Role Based UI

- Role switcher in the hero controls
- Admin gets add/edit actions
- Viewer stays read-only

### 4. Insights Section

- Highest spending category
- Monthly comparison
- Additional spending observation

### 5. State Management

- React state handles transactions, filters, theme, modal state, and selected role
- `useDeferredValue` is used for smoother search input updates

### 6. UX Details

- Mobile-friendly responsive layout
- Clear filter reset flow
- Empty state when no transactions match filters
- Data export actions for better usability

## Notes

- This project is meant for evaluation and uses mock data by design.
- The transaction dataset is persisted locally in the browser, so dashboard changes remain after refresh.
# zorvyn.io-Assignment
