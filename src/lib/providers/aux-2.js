import {
	image,
	link
} from 'mdast-builder'

/**
 * Render a second auxillary badge.
 * @private
 * @param  {Object} config Configuration object.
 * @return {Node}          MDAST node containing badge.
 */
export default function render(config) {
	const badgeNode = image(
		`https://img.shields.io/badge/${config.title}-${config.text}-${config.color}`,
		config.title,
		config.title
	)

	if (config.link) {
		return link(
			config.link,
			config.title,
			[badgeNode]
		)
	}

	return badgeNode
}
