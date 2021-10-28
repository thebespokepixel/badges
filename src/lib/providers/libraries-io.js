import {
	image,
	link
} from 'mdast-builder'
import {renderIconSVG} from '../utils.js'

export function libsRelease(config, user) {
	return link(
		`https://libraries.io/github/${user.github.slug}`,
		config.title,
		[
			image(
				`https://img.shields.io/librariesio/release/npm/${
				user.fullName
			}/latest?${config.icon && renderIconSVG('libraries-io')}`,
				config.title,
				config.title
			)
		]
	)
}

export function libsRepo(config, user) {
	return link(
		`https://libraries.io/github/${user.github.slug}`,
		config.title,
		[
			image(
				`https://img.shields.io/librariesio/github/${
				user.librariesIoName
			}?${config.icon && renderIconSVG('libraries-io')}`,
				config.title,
				config.title
			)
		]
	)
}
