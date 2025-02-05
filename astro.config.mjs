import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  adapter: node({ mode: "standalone" }), // <-- Esto es importante
  integrations: [tailwind(), react()],
});
