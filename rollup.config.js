import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { dts } from 'rollup-plugin-dts'

const plugins = [resolve(), commonjs(), json()]

export default [
  {
    input: 'out/src/cli/index.js',
    output: {
      file: 'dist/cli.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input: 'out/src/cli/index.d.ts',
    output: {
      file: 'dist/cli.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
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
