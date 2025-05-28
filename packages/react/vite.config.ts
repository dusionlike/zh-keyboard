import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig((env) => {
  if (env.command === 'serve') {
    return {
      plugins: [react()],
    }
  } else {
    return {
      plugins: [
        react(),
        dts({ tsconfigPath: './tsconfig.app.json' }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/lib.ts'),
          name: 'ZhKeyboardReact',
          fileName: 'zh-keyboard-react',
          cssFileName: 'style',
        },
        sourcemap: true,
        copyPublicDir: false,
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              'react': 'React',
              'react-dom': 'ReactDOM',
            },
            exports: 'named',
          },
        },
      },
    }
  }
})
