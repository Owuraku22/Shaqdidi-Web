import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from 'node:fs'

export default defineConfig({
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, "./public/cert/key.pem")),
  //     cert: fs.readFileSync(path.resolve(__dirname, "./public/cert/cert.crt")),
  //   },
  // },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
