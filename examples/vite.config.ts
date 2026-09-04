import vue from '@vitejs/plugin-vue'
import { copyAssetsPlugin } from '@zh-keyboard/copy-assets'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 5178,
  },
  plugins: [vue(), copyAssetsPlugin()],
})
