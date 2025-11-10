import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    { // me actualiza la pagina cada vez q hago un cambio en el codigo
      name: 'full-reload',
      handleHotUpdate({ server }) {
        server.ws.send({
          type: 'full-reload',
          return: [ ]
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
