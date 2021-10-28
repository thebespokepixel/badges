import {
	image,
	link,
} from 'mdast-builder'

// [snyk-badge]:https://snyk.io/test/github/thebespokepixel/es-tinycolor/badge.svg
// [snyk]: https://snyk.io/test/github/MarkGriffiths/meta

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
