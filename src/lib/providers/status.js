import _ from 'lodash'
import node from 'unist-builder'

/**
 * Render a status badge.
 * @private
 * @param  {Object} config Configuration object.
 * @return {Node}          MDAST node containing badge.
 */
export default function render(config) {
	const badgeNode = node('image', {
		alt: _.upperFirst(config.title),
		url: `https://img.shields.io/badge/status-${
			config.text
		}-${
			config.color
		}`
	})

	if (config.link) {
		return node('link', {
			title: _.upperFirst(config.title),
			url: config.link
		}, [
			badgeNode
		])
	}

	return badgeNode
}
