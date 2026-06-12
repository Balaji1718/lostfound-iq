import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;

// Body parsing middleware for API routes
app.use("/api", express.json());

// Sample backend API routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "FindBack Backend API",
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    appName: "FindBack",
    tagline: "Lost Something? Find It Back.",
    version: "1.0.0",
  });
});

// Serve frontend: Proxy in development, serve static or proxy in production
if (NODE_ENV === "development") {
  console.log(`[Backend] Proxying non-API traffic to http://localhost:${FRONTEND_PORT}`);
  app.use(
    "/",
    createProxyMiddleware({
      target: `http://localhost:${FRONTEND_PORT}`,
      changeOrigin: true,
      ws: true, // Crucial for Vite HMR (Hot Module Replacement) via WebSockets
      on: {
        error: (err: any, req: any, res: any) => {
          console.warn("[Backend Proxy Error]: Could not reach the frontend dev server. Is it running?");
          if (res && typeof res.status === "function") {
            res.status(502).send("Frontend dev server is warming up or not running. Please wait and refresh.");
          }
        },
      },
    })
  );
} else {
  // Production mode
  // Try to serve static client assets first (if compiled as SPA or static client)
  const clientBuildPath = path.resolve(__dirname, "../../frontend/dist/client");
  console.log(`[Backend] Production mode. Checking for static client build at: ${clientBuildPath}`);
  
  app.use(express.static(clientBuildPath));
  
  // If we're running SSR in production, we can proxy to the internal SSR server.
  // We'll attempt to proxy non-static files to the SSR server if FRONTEND_PORT is responding.
  app.use(
    "/",
    createProxyMiddleware({
      target: `http://localhost:${FRONTEND_PORT}`,
      changeOrigin: true,
      ws: true,
      on: {
        error: (err: any, req: any, res: any) => {
          // Fallback: If SSR server is not running or we are running SPA, serve index.html
          if (res && typeof res.sendFile === "function") {
            res.sendFile(path.join(clientBuildPath, "index.html"), (sendErr: any) => {
              if (sendErr) {
                res.status(404).send("FindBack Client build not found. Please run build script.");
              }
            });
          }
        },
      },
    })
  );
}

app.listen(PORT, () => {
  console.log(`[Backend] Server running on http://localhost:${PORT}`);
});
