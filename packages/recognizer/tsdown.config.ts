import { defineConfig } from 'tsdown'
import { mergeLicenseCommentsPlugin } from './merge-license-comments.ts'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  platform: 'browser',
  sourcemap: false,
  minify: true,
  plugins: [mergeLicenseCommentsPlugin()],
  deps: {
    neverBundle: ['node-fetch'],
    alwaysBundle: [/^@tensorflow\/tfjs-/],
  },
  outDir: 'dist',
})
