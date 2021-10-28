import {
	image,
	link
} from 'mdast-builder'
import urlencode from 'urlencode'
import {renderIconSVG} from '../utils.js'

export default function render(config, user) {
	return link(
		'https://github.com/rollup/rollup/wiki/pkg.module',
		config.title,
		[
			image(
				`https://img.shields.io/badge/es6-${
					urlencode('type: module ✔')
				}-64CA39?${config.icon && renderIconSVG('rollup')}`,
				config.title,
				config.title
			)
		]
	)
}

