#!/usr/bin/env node

import esbuild from 'esbuild'
import cssModulesPlugin from 'esbuild-css-modules-plugin'

try {
  await esbuild.build({
    logLevel: 'info',
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/app.js',
    plugins: [cssModulesPlugin()]
  })
} catch {
  process.exit(1)
}
