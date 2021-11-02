import {
	image,
	link,
} from 'mdast-builder'

export default function render(config) {
	const badgeNode = image(
		`https://img.shields.io/badge/${config.title}-${config.text}-${config.color}`,
		config.title,
		config.title,
	)

	if (config.link) {
		return link(
			config.link,
			config.title,
			[badgeNode],
		)
	}

	return badgeNode
}
