import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // immediately invoked function expression
  },
  plugins: [
    resolve(),
    terser(), // Enable minification
  ],
  treeshake: true, // Enable tree shaking
};
