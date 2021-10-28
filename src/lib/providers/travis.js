import _ from 'lodash'
import {u} from 'unist-builder'

// https://img.shields.io/travis/MarkGriffiths/badges.svg?branch=master&style=flat
// https://img.shields.io/travis/thebespokepixel/trucolor?logo=travis&style=flat-square
// https://img.shields.io/travis/thebespokepixel/trucolor/develop?style=flat&logo=travis
// https://travis-ci.org/MarkGriffiths/badges

export function travis(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://travis-ci.org/${
			user.github.slug
		}`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/travis/${
				user.github.slug
			}/${
				config.branch === 'dev' ? user.devBranch : config.branch
			}?logo=travis`,
		}),
	])
}

export function travisCom(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://travis-ci.com/${
			user.github.slug
		}`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/travis/com/${
				user.github.slug
			}/${
				config.branch === 'dev' ? user.devBranch : config.branch
			}?logo=travis`,
		}),
	])
}

export function travisPro(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://travis-ci.com/${
			user.github.slug
		}`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://api.travis-ci.com/${
				user.github.slug
			}.svg?branch=${
				config.branch === 'dev' ? user.devBranch : config.branch
			}&token=${
				user.travisToken
			}`,
		}),
	])
}
