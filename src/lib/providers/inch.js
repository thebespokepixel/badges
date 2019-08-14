import _ from 'lodash'
import node from 'unist-builder'

export default function render(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://inch-ci.org/github/${
			user.github.slug
		}`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://inch-ci.org/github/${
				user.github.slug
			}.svg?branch=${
				config.branch === 'dev' ? user.devBranch : config.branch
			}&style=shields`
		})
	])
}
