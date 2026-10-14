import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const dataDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../Backend/data',
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // The mock-data layer lives outside Frontend/, so expose it as @data.
    alias: { '@data': dataDir },
  },
  server: {
    fs: { allow: ['..'] },
  },
})
