// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// vite.config.js
export default defineConfig({
  base: "/",   // GitHub Pages 用に設定してた人は "/" に戻す！
  plugins: [react()],
})


