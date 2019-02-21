import _ from 'lodash'
import node from 'unist-builder'

// [![Greenkeeper badge](https://badges.greenkeeper.io/MarkGriffiths/palette2oco.svg)](https://greenkeeper.io/)

export default function render(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: 'https://greenkeeper.io/'
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://badges.greenkeeper.io/${
				user.github.slug
			}.svg?token=${
				user.greenkeeperToken
			}`
		})
	])
}
