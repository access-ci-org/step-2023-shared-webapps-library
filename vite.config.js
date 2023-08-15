import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const env = loadEnv(
  'mock',
  process.cwd(),
  ''
);

const ASSET_URL = env.ASSET_URL || '';


// https://vitejs.dev/config/
export default defineConfig({
  base: `${ASSET_URL}`,
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
