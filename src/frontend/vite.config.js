import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteEnvCompatible from 'vite-plugin-env-compatible'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEnvCompatible()  // Add this plugin to enable Jest to understand import.meta.env
  ],
  base: '/',
})
