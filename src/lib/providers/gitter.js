import _ from 'lodash'
import node from 'unist-builder'

export default function render(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://gitter.im/${
			user.github.user
		}/${
			config.room
		}?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/gitter/room/${
				user.github.user
			}/${
				config.room
			}.svg`
		})
	])
}
