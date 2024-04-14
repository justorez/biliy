import { builtinModules } from 'module'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { readdirSync } from 'fs'
import { readJSONSync } from 'fs-extra/esm'
import { defineConfig } from 'rollup'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { visualizer } from 'rollup-plugin-visualizer'
import { rimrafSync } from 'rimraf'

const __dirname = dirname(fileURLToPath(import.meta.url))

const packages = readdirSync('packages')
const targets = process.env.TARGETS ? process.env.TARGETS.split(',') : null
const targetPackages = targets
    ? packages.filter((pkg) => targets.includes(pkg))
    : packages

export default defineConfig(
    targetPackages.map((pkg) => {
        const distDir = `./packages/${pkg}/dist`
        const pkgJSON = readJSONSync(
            path.join(__dirname, `packages/${pkg}/package.json`)
        )

        rimrafSync(distDir)

        return {
            input: {
                index: `./packages/${pkg}/src/index.ts`
            },
            output: [
                {
                    dir: distDir,
                    entryFileNames: '[name].mjs',
                    format: 'es',
                    sourcemap: true
                },
                {
                    dir: distDir,
                    entryFileNames: '[name].cjs',
                    format: 'cjs',
                    sourcemap: true
                }
            ],
            external: [
                ...Object.keys(pkgJSON.dependencies || {}),
                ...builtinModules,
                /node:/
            ],
            plugins: [
                json(),
                esbuild({
                    platform: 'node',
                    minify: true
                }),
                nodeResolve(),
                commonjs(),
                visualizer({
                    filename: `.stats/${pkg}.html`
                })
            ]
        }
    })
)
