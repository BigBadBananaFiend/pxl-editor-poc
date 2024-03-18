#!/usr/bin/env node

import esbuild from 'esbuild'
import cssModulesPlugin from 'esbuild-css-modules-plugin'

const runDev = async function () {
  try {
    let ctx = await esbuild.context({
      logLevel: 'info',
      entryPoints: ['src/index.ts'],
      bundle: true,
      outfile: 'dist/app.js',
      plugins: [cssModulesPlugin()]
    })

    await ctx.watch()
  } catch {
    process.exit(1)
  }
}

runDev()
