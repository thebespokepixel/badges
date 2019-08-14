import _ from 'lodash'
import node from 'unist-builder'

// [inch]: https://inch-ci.org/github/MarkGriffiths/meta
// [inch-badge]: https://inch-ci.org/github/MarkGriffiths/meta.svg?branch=master&style=shields

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
				user.branch
			}&style=${
				config.style
			}`
		})
	])
}
