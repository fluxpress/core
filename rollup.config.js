import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

const plugins = [resolve(), commonjs(), json()]

export default [
  {
    input: 'src/fetch/index.js',
    output: {
      file: 'dist/fetch.bundle.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input: 'src/generate/index.js',
    output: {
      file: 'dist/generate.bundle.js',
      format: 'esm',
    },
    plugins,
  },
]
