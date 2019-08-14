import _ from 'lodash'
import node from 'unist-builder'

// https://img.shields.io/travis/MarkGriffiths/badges.svg?branch=master&style=flat
// https://img.shields.io/travis/thebespokepixel/trucolor?logo=travis&style=flat-square
// https://img.shields.io/travis/thebespokepixel/trucolor/develop?style=flat&logo=travis
// https://travis-ci.org/MarkGriffiths/badges

export default function render(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://travis-ci.com/${
			user.github.slug
		}`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/travis/com/${
				user.github.slug
			}/${
				user.branch
			}&style=${
				config.style
			}&logo=travis`
		})
	])
}
