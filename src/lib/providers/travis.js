import {
	image,
	link
} from 'mdast-builder'

// https://img.shields.io/travis/MarkGriffiths/badges.svg?branch=master&style=flat
// https://img.shields.io/travis/thebespokepixel/trucolor?logo=travis&style=flat-square
// https://img.shields.io/travis/thebespokepixel/trucolor/develop?style=flat&logo=travis
// https://travis-ci.org/MarkGriffiths/badges
//
export function travis(config, user) {
	return link(
		`https://travis-ci.com/${user.github.slug}`,
		config.title,
		[
			image(
				`https://img.shields.io/travis/com/${user.github.slug}/${
					config.branch === 'dev' ? user.devBranch : config.branch
				}?logo=travis`,
				config.title,
				config.title
			)
		]
	)
}

export function travisPro(config, user) {
	return link(
		`https://travis-ci.com/${user.github.slug}`,
		config.title,
		[
			image(
				`https://api.travis-ci.com/${user.github.slug}.svg?branch=${
					config.branch === 'dev' ? user.devBranch : config.branch
				}&token=${
					user.travisToken
				}`,
				config.title,
				_.upperFirst(config.title)
			)
		]
	)
}
