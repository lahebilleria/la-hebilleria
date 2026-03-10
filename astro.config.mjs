import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from "@astrojs/sitemap";
import react from '@astrojs/react';
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // Add your domain here
   site: 'https://lahebilleria.com.ar',
  integrations: [sitemap(), react()],
  devToolbar: {
    enabled: false
  }

});