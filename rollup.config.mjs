import terser from "@rollup/plugin-terser"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import postcss from "rollup-plugin-postcss"
import peerDepsExternal from "rollup-plugin-peer-deps-external"

import pkg from "./package.json" assert { type: "json" }

const extensions = [".js", ".jsx", ".ts", ".tsx"]

export default [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions,
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      postcss({
        modules: true,
      }),
      terser(),
    ],
  },
]
