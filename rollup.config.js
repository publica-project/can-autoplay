import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  // Browser-friendly UMD build
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'lib/index.ts',
    output: [
      { file: 'build/can-autoplay.js', format: 'umd', name: 'canAutoplay' },
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
      })
    ]
  }
];
