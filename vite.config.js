import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "public",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000", // our backend server
        changeOrigin: true,
      },
    },
  },
  publicDir: false,
});
