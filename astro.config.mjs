// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react"; // Importar el renderizador de React

export default defineConfig({
  output: "server", // Habilitar modo servidor para soportar endpoints dinámicos
  integrations: [tailwind(), react()]
});