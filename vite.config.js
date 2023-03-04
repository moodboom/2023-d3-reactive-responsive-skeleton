import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8008,
    strictPort: true, // don't roll to 8009 etc
  },
  build: {
    minify: 'terser', // MDM crush it real good
  }
})
