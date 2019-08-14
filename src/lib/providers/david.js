import _ from 'lodash'
import node from 'unist-builder'

// [david-badge]: http://img.shields.io/david/MarkGriffiths/meta.svg?branch=master&style=flat
// [david-dev-badge]: http://img.shields.io/david/dev/MarkGriffiths/meta.svg?branch=master&style=flat
// [david]: https://david-dm.org/MarkGriffiths/meta/master
// [david-dev]: https://david-dm.org/MarkGriffiths/meta/master#info=devDependencies
// https://david-dm.org/thebespokepixel/badges/master/status.svg

export function david(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://david-dm.org/${
			user.github.slug
		}/${
			config.branch === 'dev' ? user.devBranch : config.branch
		}`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://david-dm.org/${
				user.github.slug
			}/${
				config.branch === 'dev' ? user.devBranch : config.branch
			}/status.svg`
		})
	])
}

export function davidDevDeps(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://david-dm.org/${
			user.github.slug
		}/${
			config.branch === 'dev' ? user.devBranch : config.branch
		}?type=dev`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://david-dm.org/${
				user.github.slug
			}/${
				config.branch === 'dev' ? user.devBranch : config.branch
			}/status.svg`
		})
	])
}
