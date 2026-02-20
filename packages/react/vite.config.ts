import { createReadStream, existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const rimeDataDir = resolve(__dirname, '../pinyin/data')

const mimeTypes: Record<string, string> = {
  '.wasm': 'application/wasm',
  '.js': 'application/javascript',
  '.data': 'application/octet-stream',
  '.bin': 'application/octet-stream',
  '.yaml': 'text/yaml',
}

function serveRimeDataPlugin(): Plugin {
  return {
    name: 'serve-rime-data',
    configureServer(server) {
      server.middlewares.use('/rime', (req, res, next) => {
        // Strip query params (Vite adds ?import to dynamic imports)
        const urlPath = (req.url ?? '').split('?')[0].replace(/^\//, '')
        const filePath = resolve(rimeDataDir, urlPath)
        if (existsSync(filePath) && statSync(filePath).isFile()) {
          const ext = filePath.slice(filePath.lastIndexOf('.'))
          res.setHeader('Content-Type', mimeTypes[ext] ?? 'application/octet-stream')
          createReadStream(filePath).pipe(res)
        }
        else {
          next()
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig((env) => {
  if (env.command === 'serve') {
    return {
      server: {
        port: 5175,
      },
      plugins: [react(), serveRimeDataPlugin()],
    }
  }
  else {
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
