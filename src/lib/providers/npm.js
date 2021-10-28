import {
	image,
	link,
} from 'mdast-builder'

export default function render(config, user) {
	return link(
		`https://www.npmjs.com/package/${user.fullName}`,
		config.title,
		[
			image(
				`https://img.shields.io/npm/v/${user.fullName}?logo=npm`,
				config.title,
				config.title,
			),
		],
	)
}
