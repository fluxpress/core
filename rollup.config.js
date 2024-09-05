import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { dts } from 'rollup-plugin-dts'

const plugins = [resolve(), commonjs(), json()]

export default [
  {
    input: 'out/src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input: 'out/src/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
]
