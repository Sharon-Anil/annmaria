# Boutique Prototype (MERN)

This is a non-functional (dummy) prototype boutique website built with the MERN stack philosophy (React, Node, Express, local dummy memory data instead of MongoDB for prototype speed). It uses advanced modern design, responsive layouts, and smooth animations.

## Features Included
- **User Module:** Luxury Hero page, Exclusive collection showcase, Product grid with filtering/sorting, Product Detail view, and a full Cart Drawer/Page. Checkout uses Razorpay placeholders. 
- **Admin Module:** Dashboard with Recharts visualization for revenue and orders.
- **Aesthetics:** `styled-components`, `framer-motion` animations, glassmorphism overlays, and deeply custom CSS variables.

## How to Run

1. Make sure you are in the root `boutique-prototype` (or your chosen root folder).
2. Install concurrently dependencies in root, client, and server:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```
3. Run the development environment:
   ```bash
   npm start
   ```
   **This single command will spin up BOTH the client Vite server and the Node/Express backend APIs.**

4. Access the App:
   - Frontend: `http://localhost:5173` (or port specified by Vite)
   - Backend API: `http://localhost:5000`

## Structure Details
- `client/src/pages/` : Contains main views (`Home`, `Shop`, `Cart`, `Dashboard`, `ProductDetails`).
- `client/src/components/layout` : Contains Navbar with Desktop/Mobile responsiveness, Footer.
- `client/src/index.css` : Holds the base styling logic and modern aesthetic CSS variables.
- `server/data/` : Holds the mock JSON data arrays acting as our prototype "database".
- `server/index.js` : Main Express server and REST API configuration.
