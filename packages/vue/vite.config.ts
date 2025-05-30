import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig((env) => {
  if (env.command === 'serve') {
    return {
      server: {
        port: 5174,
      },
      plugins: [
        vue(),
      ],
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
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
            exports: 'named',
          },
        },
      },
    }
  }
})
