import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'

const plugins = [resolve(), commonjs(), json(), typescript()]

export default [
  {
    input: 'src/cli/index.js',
    output: {
      file: 'dist/cli.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'esm',
    },
    plugins,
  },
]
