import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { copyAssetsPlugin } from '@zh-keyboard/copy-assets'
import { defineConfig, esmExternalRequirePlugin } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig((env) => {
  if (env.command === 'serve') {
    return {
      server: {
        port: 5175,
      },
      plugins: [react(), copyAssetsPlugin({ build: false })],
    }
  } else {
    return {
      plugins: [
        react(),
        // React externals belong to this plugin so bundled CommonJS dependencies
        // use ESM imports instead of leaving browser-incompatible require() calls.
        esmExternalRequirePlugin({ external: ['react', 'react-dom'] }),
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
          external: [
            '@zh-keyboard/core',
          ],
          output: {
            globals: {
              'react': 'React',
              'react-dom': 'ReactDOM',
              '@zh-keyboard/core': 'ZhKeyboardCore',
            },
            exports: 'named',
          },
        },
      },
    }
  }
})
