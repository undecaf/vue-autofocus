import vue from 'rollup-plugin-vue'
import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import license from 'rollup-plugin-license'
import minimist from 'minimist'
import moment from 'moment'
import pkg from './package.json'


function kebabToPascal(text) {
    return text.replace(/(^\w|-\w)/g, t => t.replace(/-/, '').toUpperCase());
}

function unscoped(name) {
    return name.replace(/^(@.+?\/)?/, '')
}

const
    argv = minimist(process.argv.slice(2)),
    name = kebabToPascal(unscoped(pkg.name)),
    src = `src/${unscoped(pkg.name)}`


const baseConfig = {
    plugins: {
        preVue: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            commonjs(),
        ],
        vue: {
            css: true,
            template: {
                isProduction: true,
            },
        },
        postVue: [
            buble({
                objectAssign: 'Object.assign',
                transforms: {
                    dangerousForOf: true,
                },
            }),
        ],
        license: license({
            sourcemap: true,
            banner: {
                content:    `${pkg.name} v${pkg.version}
                            ${pkg.description}
                            Built ${moment().format('YYYY-MM-DD HH:mm:ss')}
                            (c) 2020-present Ferdinand Kasper
                            Released under the MIT license`,
                commentStyle: 'ignored',
            },
            thirdParty: {
                allow: 'MIT',
            },
        }),
    },
}

// Customize configs for individual targets
const buildFormats = []

if (!argv.format || argv.format === 'es') {
    // ESM build to be used with webpack/rollup
    const esConfig = {
        ...baseConfig,
        input: `${src}/index.js`,
        output: {
            file: pkg.module,
            format: 'esm',
            exports: 'named',
            sourcemap: true,
        },
        plugins: [
            ...baseConfig.plugins.preVue,
            css({
                output: pkg.style,
            }),
            vue({
                ...baseConfig.plugins.vue,
                css: false,
            }),
            ...baseConfig.plugins.postVue,
            terser({
                output: {
                    ecma: 6,
                },
            }),
            resolve(),
            baseConfig.plugins.license,
        ],
    }

    buildFormats.push(esConfig)
}

if (!argv.format || argv.format === 'cjs') {
    // SSR build
    const umdConfig = {
        ...baseConfig,
        input: `${src}/index.js`,
        output: {
            compact: true,
            file: pkg.main,
            format: 'cjs',
            name,
            exports: 'named',
            sourcemap: true,
        },
        plugins: [
            ...baseConfig.plugins.preVue,
            css({
                output: pkg.style,
            }),
            vue({
                ...baseConfig.plugins.vue,
                template: {
                    ...baseConfig.plugins.vue.template,
                    optimizeSSR: true,
                },
                css: false,
            }),
            ...baseConfig.plugins.postVue,
            resolve(),
            baseConfig.plugins.license,
        ],
    }

    buildFormats.push(umdConfig)
}

if (!argv.format || argv.format === 'iife') {
    // Browser build
    const unpkgConfig = {
        ...baseConfig,
        input: `${src}/wrapper.js`,
        output: {
            compact: true,
            file: pkg.unpkg,
            format: 'iife',
            name,
            exports: 'named',
            sourcemap: true,
        },
        plugins: [
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            terser({
                output: {
                    ecma: 5,
                },
            }),
            resolve(),
            baseConfig.plugins.license,
        ],
    }

    buildFormats.push(unpkgConfig)
}

// Export config
export default buildFormats
