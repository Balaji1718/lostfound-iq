# FindBack Environment Variables

This document outlines the environment variables required to run the FindBack landing page and API in development and production.

---

## 1. Backend Configuration (`backend/.env`)

These environment variables configure the Express server, routing, and development reverse-proxy.

| Variable Name | Description | Default Value | Allowed Values | Required in Prod |
| :--- | :--- | :---: | :---: | :---: |
| **`PORT`** | The port that the unified Express gateway server will listen on. | `5000` | Any free port | **Yes** |
| **`FRONTEND_PORT`** | The internal port where the frontend (Vite/Vinxi dev or SSR server) runs. | `3000` | Any free port | **Yes** |
| **`NODE_ENV`** | The deployment mode. Activates Vite HMR proxy in dev, and serves client assets in production. | `development` | `development` \| `production` | **Yes** |

### Example `backend/.env` File:
```env
PORT=5000
FRONTEND_PORT=3000
NODE_ENV=production
```

---

## 2. Frontend Configuration (`frontend/.env`)

The frontend contains client-safe configurations. The Firebase SDK initialization keys are safely hardcoded in [firebase.ts](file:///d:/lostfound-iq/frontend/src/lib/firebase.ts), as they are client-safe by design. However, you can configure standard overrides if needed:

| Variable Name | Description | Required | Purpose |
| :--- | :--- | :---: | :--- |
| **`VITE_FIREBASE_API_KEY`** | Overrides the default Firebase API key. | Optional | Multi-environment staging/production setups. |
| **`VITE_FIREBASE_PROJECT_ID`** | Overrides the default Firebase Project ID. | Optional | Multi-environment staging/production setups. |
| **`VITE_FIREBASE_APP_ID`** | Overrides the default Firebase App ID. | Optional | Multi-environment staging/production setups. |

---

## 3. Vercel Configuration Settings

If deploying to Vercel, define these environment variables in your Vercel Project Dashboard:

1. Go to **Project Settings** > **Environment Variables**.
2. Add:
   * `NODE_ENV` = `production`
   * `PORT` = `5000`
   * `FRONTEND_PORT` = `3000`
