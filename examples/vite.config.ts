import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/zh-keyboard/',
  server: {
    port: 5175,
  },
  plugins: [vue()],
})
