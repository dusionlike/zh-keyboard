import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { copyAssetsPlugin } from '@zh-keyboard/copy-assets'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig((env) => {
  if (env.command === 'serve') {
    return {
      server: {
        port: 5174,
      },
      plugins: [vue(), copyAssetsPlugin({ build: false })],
    }
  } else {
    return {
      plugins: [
        vue(),
        dts({ tsconfigPath: './tsconfig.app.json' }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/lib.ts'),
          name: 'ZhKeyboardVue',
          fileName: 'zh-keyboard-vue',
          cssFileName: 'style',
        },
        sourcemap: true,
        copyPublicDir: false,
        rollupOptions: {
          external: [
            'vue',
            '@zh-keyboard/core',
          ],
          output: {
            globals: {
              'vue': 'Vue',
              '@zh-keyboard/core': 'ZhKeyboardCore',
            },
            exports: 'named',
          },
        },
      },
    }
  }
})
