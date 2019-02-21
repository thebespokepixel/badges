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
		}/maintainability`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://api.codeclimate.com/v1/badges/${
				user.codeclimateToken
			}/maintainability?style=${
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
		}/test_coverage`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://api.codeclimate.com/v1/badges/${
				user.codeclimateToken
			}/test_coverage?style=${
				config.style
			}`
		})
	])
}
