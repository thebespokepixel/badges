import _ from 'lodash'
import node from 'unist-builder'

// https://img.shields.io/travis/MarkGriffiths/badges.svg?branch=master&style=flat
// https://travis-ci.org/MarkGriffiths/badges

export default function render(config, user) {
	return node('paragraph', [
		node('link', {
			title: _.upperFirst(config.title),
			url: `https://travis-ci.org/${
				user.github.slug
			}`
		}, [
			node('image', {
				alt: _.upperFirst(config.title),
				url: `https://img.shields.io/travis/${
					user.github.slug
				}.svg?branch=${
					config.branch
				}&style=${
					config.style
				}`
			})
		]),
		node('text', ' ')
	])
}
