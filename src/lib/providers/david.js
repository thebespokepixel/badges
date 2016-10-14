import _ from 'lodash'
import node from 'unist-builder'

// [david-badge]: http://img.shields.io/david/MarkGriffiths/meta.svg?branch=master&style=flat
// [david-dev-badge]: http://img.shields.io/david/dev/MarkGriffiths/meta.svg?branch=master&style=flat
// [david]: https://david-dm.org/MarkGriffiths/meta/master
// [david-dev]: https://david-dm.org/MarkGriffiths/meta/master#info=devDependencies

export function david(config, user) {
	return node('paragraph', [
		node('link', {
			title: _.upperFirst(config.title),
			url: `https://david-dm.org/${
				user.github.slug
			}/${
				config.branch
			}`
		}, [
			node('image', {
				alt: _.upperFirst(config.title),
				url: `https://img.shields.io/david/${
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

export function davidDev(config, user) {
	return node('paragraph', [
		node('link', {
			title: _.upperFirst(config.title),
			url: `https://david-dm.org/${
				user.github.slug
			}/${
				config.branch
			}#info=devDependencies`
		}, [
			node('image', {
				alt: _.upperFirst(config.title),
				url: `https://img.shields.io/david/dev/${
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
