import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Set the appropriate target for your application
    target: "esnext",
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    // "import.meta.env.NODE_ENV": JSON.stringify(import.meta.env.NODE_ENV),
  },
});
