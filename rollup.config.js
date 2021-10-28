import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'

const external = id => !id.startsWith('src') && !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0')

const config = [{
	external,
	plugins: [resolve(), commonjs()],
	input: 'src/index.js',
	output: {
		file: 'index.js',
		format: 'es',
	},
}, {
	external,
	plugins: [resolve(), json({preferConst: true}), commonjs()],
	input: 'src/compile-readme.js',
	output: {
		banner: '#! /usr/bin/env node',
		file: 'compile-readme.js',
		format: 'es',
	},
}]

export default config
