import node from 'unist-builder'

export default function render(config, user) {
	return node('link', {
		title: config.title,
		url: `https://www.npmjs.com/package/${
			user.fullName
		}`
	}, [
		node('image', {
			alt: config.title,
			url: `https://img.shields.io/npm/v/${
				user.fullName
			}?logo=npm`
		})
	])
}
