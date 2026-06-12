# FindBack Landing Page

An AI-powered, institution-based lost and found platform designed to securely reconnect individuals with their lost belongings on university and school campuses.

---

## 🚀 Features

* **Institution-Based Scoping:** Access is restricted to verified campus domains to maintain security and trust.
* **AI-Powered Assistance:** Write reports, analyze queries, and match items using a natural language assistant.
* **Secure Verification System:** Multi-step ownership proofs and structured claim validations prevent wrongful recoveries.
* **Real-time Notifications:** Immediate email/push notifications are triggered on potential lost-and-found matches.
* **Admin Control Center:** Specialized dashboard with audit trails, statistics tracking, and campus-wide reporting analytics.
* **Responsive Mobile Showcase:** Carousel displaying Android APK features, responsive layouts, and accessibility support.

---

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, TanStack Start (Vite, Vinxi SSR, routing)
* **Backend:** Node.js, Express (Reverse-proxy and health check gateways)
* **Styling & UI:** TailwindCSS, Shadcn UI components, Framer Motion animations
* **Database & Auth:** Firebase Firestore database and Client SDK integration

---

## 📁 Project Directory Structure

This monorepo project is divided into distinct client and server workspaces:

* **`frontend/`**: TanStack Start React client application, Vite config, styles, assets, and views.
* **`backend/`**: Express server handling development websocket proxies and production server entry.

---

## 🔧 Setup & Installations

### 1. Environment Variables Configuration

Copy the template configuration at the project root to create your development environment file:
```bash
cp .env.example frontend/.env.development
```

Open the newly created `frontend/.env.development` file and insert your Firebase client credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### 2. Firebase Database Requirements

Ensure your Firestore database has the following collections and documents configured:

#### Collections:
* `/institutions`: Contains registered campus profiles.
* `/waitlist`: Writes early waitlist signups.
* `/contact_requests`: Writes contact support forms.

#### Documents:
* `/app_config/mobile_app`: Defines mobile version details:
  * `latestVersionName` (string, e.g. `"1.0.0"`)
  * `releaseNotes` (string)
  * `apkUrl` (string)
  * `releaseDate` (string)
* `/app_config/landing_page`: Dynamic page configurations:
  * `supportEmail` (string)
  * `institutionEmail` (string)
  * `githubUrl` (string)
  * `linkedinUrl` (string)
  * `twitterUrl` (string)
  * `footerText` (string)
  * `heroAnnouncement` (string)
* `/app_config/landing_stats`: Landing page counters:
  * `institutions` (number)
  * `users` (number)
  * `items` (number)
  * `returnedItems` (number)

---

## 💻 Local Development

### 1. Install Workspace Dependencies
At the project root, install all node modules:
```bash
npm install
```

### 2. Run Local Development Server
Start both client and server development servers simultaneously:
```bash
npm run dev
```
* The unified reverse proxy will run on **`http://localhost:5000`**. Accessing this URL loads the landing page and transparently updates via Vite HMR.

---

## 📦 Production Builds

Compile client production assets and server bundles concurrently:
```bash
npm run build
```
* Compiles the compiled web output into `frontend/dist/` and server routing bundles in `backend/dist/`.

---

## ☁️ Vercel Deployment Instructions

Follow these settings when creating a new project on Vercel:

1. **Root Directory:** Set the root directory to `frontend`.
2. **Framework Preset:** Select `Vite` or `Other`.
3. **Build Command:** `npm run build`
4. **Output Directory:** **Leave default / empty** (Do NOT override to `dist`. Vinxi/Nitro will automatically build into `.vercel/output`).
5. **Environment Variables:** Define the standard `VITE_FIREBASE_*` variables matching the production Firebase project.
