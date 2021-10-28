import _ from 'lodash'
import {u} from 'unist-builder'

function ccPath(user) {
	return user.codeclimateRepoToken
		? `repos/${user.codeclimateRepoToken}`
		: `github/${user.github.slug}`
}

export function cc(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://codeclimate.com/${ccPath(user)}/maintainability`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://api.codeclimate.com/v1/badges/${
				user.codeclimateToken
			}/maintainability`,
		}),
	])
}

export function ccCoverage(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://codeclimate.com/${ccPath(user)}/test_coverage`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: 'https://api.codeclimate.com/v1/badges/' + user.codeclimateToken + '/test_coverage',
		}),
	])
}
