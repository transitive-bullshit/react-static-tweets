import { defineConfig, Options } from 'tsup'

const baseConfig: Options = {
  entry: ['src/index.ts'],
  outDir: 'build',
  target: 'es2015',
  platform: 'browser',
  format: ['esm'],
  splitting: false,
  shims: false
}

export default defineConfig([
  {
    ...baseConfig,
    outDir: 'build/dev',
    minify: false,
    sourcemap: true
  },
  {
    ...baseConfig,
    outDir: 'build',
    minify: false,
    sourcemap: false
  }
])
