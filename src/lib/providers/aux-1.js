import _ from 'lodash'
import {u} from 'unist-builder'

/**
 * Render a auxillary badge.
 * @private
 * @param  {Object} config Configuration object.
 * @return {Node}          MDAST node containing badge.
 */
export default function render(config) {
	const badgeNode = u('image', {
		alt: _.upperFirst(config.title),
		url: `https://img.shields.io/badge/${
			config.title
		}-${
			config.text
		}-${
			config.color
		}`,
	})

	if (config.link) {
		return u('link', {
			title: _.upperFirst(config.title),
			url: config.link,
		}, [
			badgeNode,
		])
	}

	return badgeNode
}
