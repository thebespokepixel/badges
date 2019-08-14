import _ from 'lodash'
import node from 'unist-builder'

export default function render(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://travis-ci.com/${
			user.github.slug
		}`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://api.travis-ci.com/${
				user.github.slug
			}.svg?branch=${
				user.branch
			}&token=${
				user.travisToken
			}`
		})
	])
}
