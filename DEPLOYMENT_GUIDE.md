# FindBack Deployment Guide

This guide details how to deploy the FindBack monorepo to production environments. The repository is set up with a `frontend` workspace (React, Vite, TanStack Start SSR) and a `backend` workspace (Express proxy gateway).

---

## Deployment Architectures

### 1. Deployment via Vercel (Recommended for Frontend)

Vercel automatically detects the TanStack Start framework. Since this project is a monorepo, follow these settings when configuring Vercel:

1. **Framework Preset:** `TanStack Start` (or `Other` / `Vite`)
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** **Leave default / empty** (Do NOT override to `dist`. Vinxi/Nitro will automatically build into `.vercel/output`).
5. **Environment Variables:** Define your custom `VITE_FIREBASE_*` configuration variables in Vercel's Project Dashboard.

---

### 2. Standalone VPS / Node Server Deployment (Recommended for Unified Single-Port Hosting)

To deploy both the frontend SSR/Static client and backend Express server on a single VPS port (e.g. port `5000` or `80`):

#### Step 1: Install Dependencies
At the root directory, install all dependencies for the monorepo:
```bash
npm install
```

#### Step 2: Build Both Workspaces
Build the frontend client bundle and the backend TypeScript files concurrently:
```bash
npm run build
```
*   This compiles the React client to `frontend/dist/` and compiles the backend Express server to `backend/dist/server.js`.

#### Step 3: Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
FRONTEND_PORT=3000
NODE_ENV=production
```

#### Step 4: Run the Production Server
Start the unified production server:
```bash
npm start
```
*   *Note: In production, the backend Express server serves `frontend/dist/client` statically on port `5000` and redirects other requests to the internal SSR rendering endpoints.*

#### Process Manager (PM2) Recommendation
For production resilience, run the process with **PM2**:
```bash
npm install -g pm2
pm2 start backend/dist/server.js --name "findback-server"
pm2 save
```

---

## Production Verification Checklist
After deployment, verify:
*   [ ] The landing page loads successfully on port `5000`.
*   [ ] `/api/health` returns `{"status":"ok"}`.
*   [ ] Forms on `/` (Waitlist, Contact Us) save records successfully to Firebase Firestore.
*   [ ] Navigating to `/sitemap.xml` and `/robots.txt` loads correct SEO tags.
