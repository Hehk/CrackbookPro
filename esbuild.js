#!/usr/bin/env node

let esbuild = require("esbuild")
let createPath = file => `${__dirname}/${file}`

esbuild.build({
  entryPoints: ["src/Background.bs.js", "src/Content.bs.js"].map(createPath),
  bundle: true,
  outdir: createPath("dist/build")
})

esbuild.build({
  entryPoints: ["src/Options.bs.js"].map(createPath),
  define: {
    "process.env.NODE_ENV": `"${process.env.NODE_ENV ? process.env.NODE_ENV : "development"}"`
  },
  bundle: true,
  outdir: createPath("dist/build")
})
