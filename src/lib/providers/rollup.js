import _ from 'lodash'
import {u} from 'unist-builder'
import urlencode from 'urlencode'
import {renderIconSVG} from '../utils.js'

export default function render(config) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: 'https://github.com/rollup/rollup/wiki/pkg.module',
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/badge/es6-${
				urlencode('type: module ✔')
			}-64CA39?${config.icon && renderIconSVG('rollup')}`,
		}),
	])
}
