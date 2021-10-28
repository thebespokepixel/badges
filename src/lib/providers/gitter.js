import {
	image,
	link,
} from 'mdast-builder'

export default function render(config, user) {
	return link(
		`https://gitter.im/${
			user.github.user
		}/${
			config.room
		}?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge`,
		config.title,
		[
			image(
				`https://img.shields.io/gitter/room/${
					user.github.user
				}/${
					config.room
				}`,
				config.title,
				config.title,
			),
		],
	)
}
