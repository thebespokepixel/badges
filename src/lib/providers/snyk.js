import {
	image,
	link,
} from 'mdast-builder'

export default function render(config, user) {
	return link(
		`https://snyk.io/test/github/${user.github.slug}`,
		config.title,
		[
			image(
				`https://snyk.io/test/github/${user.github.slug}/badge.svg`,
				config.title,
				config.title,
			),
		],
	)
}
