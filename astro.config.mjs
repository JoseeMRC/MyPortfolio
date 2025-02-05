// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node"; // ✅ Importar el adapter de Node.js

export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react()],
  adapter: node({
    mode: 'standalone',
  }),
});
