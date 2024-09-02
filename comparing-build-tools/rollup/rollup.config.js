import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'MyBundle',
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
        { src: 'src/style.css', dest: 'dist' }, // Copy style.css to dist
      ]
    }),
    serve({
      contentBase: 'dist',
      port: 3000,
    })
  ]
});
