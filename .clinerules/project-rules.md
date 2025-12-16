# Project Context: STL Championship Pickleball League (STLCPL)

## Overview
This is a React application for managing the STL Championship Pickleball League. It tracks player standings, match history, and league rules. The app is built with Vite and deployed to GitHub Pages.

## Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Icons:** Lucide React
- **Data:** JSON/JS files (No backend database)

## Key Files & Directories
- `src/data/leagueData.js`: **CRITICAL**. Contains the current season data (`seasonData`), past seasons (`pastSeasons`), and league rules (`rules`). All point calculations and standings rely on this file.
- `src/data/players.json`: The roster of all players. Contains IDs, names, DUPR ratings, and image URLs.
- `src/lib/leagueUtils.js`: Contains the logic for calculating standings (`calculateSeasonStats`) and determining points based on rank (`getPointsForRank`).
- `src/pages/`: Contains the main views (Home, Standings, Players, PlayerProfile, etc.).

## Coding Guidelines
- **Styling:** Use Tailwind CSS utility classes. Avoid custom CSS unless necessary.
- **Components:** Use functional components with hooks.
- **Navigation:** Use `Link` from `react-router-dom` for internal links.
- **Data Integrity:** When modifying `leagueData.js`, ensure the structure of `weeks`, `rankings`, and `matches` remains consistent.
- **Points System:** The point structure is defined in `rules.points` within `src/data/leagueData.js`. Do not hardcode point values in components; always reference the rules or use `leagueUtils.js`.
