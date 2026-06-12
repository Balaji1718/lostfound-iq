import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    tailwindcss(),
    react(),
    tsconfigPaths(),
  ],
});
