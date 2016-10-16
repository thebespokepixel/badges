import _ from 'lodash'
import node from 'unist-builder'

/**
 * Render a status badge.
 * @param  {Object} config Configuration object.
 * @return {Node}          MDAST node containing badge.
 */
export default function render(config) {
	const badgeNode = node('image', {
		alt: _.upperFirst(config.title),
		url: `http://img.shields.io/badge/status-${
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
