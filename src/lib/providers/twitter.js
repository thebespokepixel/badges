import _ from 'lodash'
import node from 'unist-builder'

export default function render(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://twitter.com/${
			user.twitter
		}`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/twitter/follow/${
				user.twitter
			}?style=social`
		})
	])
}
