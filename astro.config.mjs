import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  output: "server",  // ⚠️ Mantener "server" para SSR
  adapter: node({ mode: 'standalone' }), // ✅ Modo standalone para Render
  integrations: [tailwind(), react()],
});
