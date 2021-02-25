#!/usr/bin/env node

let createPath = file => `${__dirname}/${file}`

require('esbuild').build({
  entryPoints: ['src/Background.bs.js', 'src/Content.bs.js'].map(createPath),
  logLevel: 'info',
  bundle: true,
  outdir: createPath('dist/build')
})
