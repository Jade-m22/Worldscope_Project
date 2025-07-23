import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      
      // —————————————————————————————————————————————————————————————————————
      // On force la sortie du manifest sous le même nom que celui  
      // que vous éditez dans /public (manifest.json)
      // —————————————————————————————————————————————————————————————————————
      manifestFilename: 'manifest.json',

      // Vous pouvez renommer ici le service‑worker généré
      filename:      'dev-sw.js',

      devOptions: {
        enabled: true,    // pour tester en dev
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },

      // C’est ce bloc qui génère le manifest sur lequel Chrome se
      // base pour l’icône de l’App. Il doit matcher exactement
      // votre public/manifest.json
      manifest: {
        name:             'WorldScope',
        short_name:       'WorldScope',
        description:      'Explorez les merveilles du monde en carte ou globe 3D.',
        theme_color:      '#1c2637',
        background_color: '#1c2637',
        display:          'standalone',
        orientation:      'portrait',
        start_url:        '/',

        icons: [
          {
            src:     '/vert_worldscope_192.webp',
            sizes:   '192x192',
            type:    'image/webp',
            purpose: 'any maskable'
          },
          {
            src:     '/vert_worldscope_512.webp',
            sizes:   '512x512',
            type:    'image/webp',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})