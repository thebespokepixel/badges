import _ from 'lodash'
import node from 'unist-builder'

// [code-climate-badge]: https://codeclimate.com/github/MarkGriffiths/badges/badges/gpa.svg
// [coverage-badge]: https://codeclimate.com/github/MarkGriffiths/badges/badges/coverage.svg
// [code-climate]: https://codeclimate.com/github/MarkGriffiths/badges
// [coverage]: https://codeclimate.com/coverage/github/MarkGriffiths/badges

export function cc(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://codeclimate.com/github/${
			user.github.slug
		}`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://codeclimate.com/github/${
				user.github.slug
			}/badges/gpa.svg?style=${
				config.style
			}`
		})
	])
}

export function ccCoverage(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://codeclimate.com/github/${
			user.github.slug
		}/coverage`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://codeclimate.com/github/${
				user.github.slug
			}/badges/coverage.svg?style=${
				config.style
			}`
		})
	])
}
