import _ from 'lodash'
import node from 'unist-builder'

/**
 * Render a auxillary badge.
 * @private
 * @param  {Object} config Configuration object.
 * @return {Node}          MDAST node containing badge.
 */
export default function render(config) {
	const badgeNode = node('image', {
		alt: _.upperFirst(config.title),
		url: `https://img.shields.io/badge/${
			config.title
		}-${
			config.text
		}-${
			config.color
		}.svg?style=${
			config.style
		}`
	})

	if (config.link) {
		return node('paragraph', [
			node('link', {
				title: _.upperFirst(config.title),
				url: config.link
			}, [
				badgeNode
			]),
			node('text', ' ')
		])
	}

	return node('paragraph', [
		badgeNode,
		node('text', ' ')
	])
}
