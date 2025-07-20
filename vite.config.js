import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'WorldScope',
        short_name: 'WorldScope',
        description: 'Explorez les merveilles du monde en carte ou globe 3D.',
        theme_color: '#1c2637',
        background_color: '#1c2637',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/icons8-tromperie-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons8-tromperie-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true, // Test du service worker en dev
        /* type: 'module', // Active seulement si tu as une erreur avec le SW */
      },
      workbox: {
        // Cache par défaut, tu peux l’ajuster si tu veux
      }
    })
  ]
});