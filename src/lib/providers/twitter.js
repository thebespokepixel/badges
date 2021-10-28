import _ from 'lodash'
import {u} from 'unist-builder'

export default function render(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://twitter.com/${
			user.twitter
		}`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/twitter/follow/${
				user.twitter
			}?style=social`,
		}),
	])
}
