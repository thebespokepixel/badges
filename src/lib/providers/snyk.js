import _ from 'lodash'
import node from 'unist-builder'

// [snyk-badge]:https://snyk.io/test/github/thebespokepixel/es-tinycolor/badge.svg
// [snyk]: https://snyk.io/test/github/MarkGriffiths/meta

export default function render(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://snyk.io/test/github/${
			user.github.slug
		}`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://snyk.io/test/github/${
				user.github.slug
			}/badge.svg`
		})
	])
}
