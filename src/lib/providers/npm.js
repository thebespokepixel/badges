import {u} from 'unist-builder'

export default function render(config, user) {
	return u('link', {
		title: config.title,
		url: `https://www.npmjs.com/package/${
			user.fullName
		}`,
	}, [
		u('image', {
			alt: config.title,
			url: `https://img.shields.io/npm/v/${
				user.fullName
			}?logo=npm`,
		}),
	])
}
