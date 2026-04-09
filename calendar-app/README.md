# Calendar App

## Features

- Current month calendar display with real-time date rendering
- Previous/next month navigation using buttons and keyboard arrows
- Date range selection with start/end highlighting
- Holiday markers for common calendar dates
- Monthly memo and range-specific notes panel
- Responsive layout for desktop and mobile
- smart selecton logic 
⏺ clicking the past date cancel selection
⏺ clicking same date reset selection 

persistant data logic using localstorage
⏺notes saved after reload
⏺selection restored per month

alert when no selection or empty notes
confirmation before eletion notes



## Built with

- React
- Vite
- date-fns
- Tailwind CSS utility classes
- CSS for responsive styling and animations

## Project structure

- `src/App.jsx` — application shell
- `src/components/Calendar.jsx` — main calendar component and interactions
- `src/components/DayCell.jsx` — individual day cell rendering and selection states
- `src/components/Notes.jsx` — monthly and range notes UI
- `src/App.css` — global styling and hero/calendar layout

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Notes

- The calendar uses `date-fns` for date calculations and formatting.
- The notes panel is designed to preserve space for range notes even before a range is selected.
- The app includes a visible shadowed container and responsive grid for smaller screens.
