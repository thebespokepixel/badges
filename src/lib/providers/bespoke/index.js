import node from 'unist-builder'

export default function render(userConfig, badgeConfig) {
	const badgeNode = node('image', {
		title: badgeConfig.title,
		url: `http://img.shields.io/badge/${
			badgeConfig.title
		}-${
			badgeConfig.text
		}-${
			badgeConfig.color
		}.svg?style=${
			badgeConfig.style
		}`
	})

	if (badgeConfig.link) {
		return node('link', {
			title: badgeConfig.title,
			url: 'http://example.com'
		}, [
			badgeNode
		])
	}

	return badgeNode
}
