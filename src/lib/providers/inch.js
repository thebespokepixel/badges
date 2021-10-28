import {
	image,
	link
} from 'mdast-builder'

export default function render(config, user) {
	return link(
		`https://inch-ci.org/github/${user.github.slug}`,
		config.title,
		[
			image(
				`https://inch-ci.org/github/${
					user.github.slug
				}.svg?branch=${
					config.branch === 'dev' ? user.devBranch : config.branch
				}&style=shields`,
				config.title,
				config.title
			)
		]
	)
}
