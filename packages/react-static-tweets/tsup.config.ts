import { defineConfig, Options } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'build',
  target: 'es2015',
  platform: 'browser',
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  minify: false,
  shims: false,
  external: ['next/image']
})
