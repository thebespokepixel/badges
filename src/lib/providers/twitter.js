import {
	image,
	link
} from 'mdast-builder'

export default function render(config, user) {
	return link(
		`https://twitter.com/${user.twitter}`,
		config.title,
		[
			image(
				`https://img.shields.io/twitter/follow/${user.twitter}?style=social`,
				config.title,
				config.title
			)
		]
	)
}
