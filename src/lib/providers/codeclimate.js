import {
	image,
	link
} from 'mdast-builder'

function ccPath(user) {
	return user.codeclimateRepoToken
		? `repos/${user.codeclimateRepoToken}`
		: `github/${user.github.slug}`
}

export function cc(config, user) {
	return link(
		`https://codeclimate.com/${ccPath(user)}/maintainability`,
		config.title,
		[
			image(
				`https://api.codeclimate.com/v1/badges/${user.codeclimateToken}/maintainability`,
				config.title,
				config.title
			)
		]
	)
}

export function ccCoverage(config, user) {
	return link(
		`https://codeclimate.com/${ccPath(user)}/test_coverage`,
		config.title,
		[
			image(
				`https://api.codeclimate.com/v1/badges/${user.codeclimateToken}/test_coverage`,
				config.title,
				config.title
			)
		]
	)
}
