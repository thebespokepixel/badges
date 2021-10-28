import _ from 'lodash';
import { packageConfig } from 'pkg-conf';
import { readPackageUp } from 'read-pkg-up';
import { remark } from 'remark';
import { image, link, root, paragraph, brk, rootWithTitle, text } from 'mdast-builder';
import remarkGap from 'remark-heading-gap';
import remarkSqueeze from 'remark-squeeze-paragraphs';
import remarkGfm from 'remark-gfm';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import urlencode from 'urlencode';

/**
 * Render a status badge.
 * @private
 * @param  {Object} config Configuration object.
 * @return {Node}          MDAST node containing badge.
 */
function render$9(config) {
	const badgeNode = image(
		`https://img.shields.io/badge/status-${config.text}-${config.color}`,
		config.title,
		config.title,
	);

	if (config.link) {
		return link(
			config.link,
			config.title,
			[badgeNode],
		)
	}

	return badgeNode
}

/**
 * Render a auxillary badge.
 * @private
 * @param  {Object} config Configuration object.
 * @return {Node}          MDAST node containing badge.
 */
function render$8(config) {
	const badgeNode = image(
		`https://img.shields.io/badge/${config.title}-${config.text}-${config.color}`,
		config.title,
		config.title,
	);

	if (config.link) {
		return link(
			config.link,
			config.title,
			[badgeNode],
		)
	}

	return badgeNode
}

/**
 * Render a second auxillary badge.
 * @private
 * @param  {Object} config Configuration object.
 * @return {Node}          MDAST node containing badge.
 */
function render$7(config) {
	const badgeNode = image(
		`https://img.shields.io/badge/${config.title}-${config.text}-${config.color}`,
		config.title,
		config.title,
	);

	if (config.link) {
		return link(
			config.link,
			config.title,
			[badgeNode],
		)
	}

	return badgeNode
}

function ccPath(user) {
	return user.codeclimateRepoToken
		? `repos/${user.codeclimateRepoToken}`
		: `github/${user.github.slug}`
}

function cc(config, user) {
	return link(
		`https://codeclimate.com/${ccPath(user)}/maintainability`,
		config.title,
		[
			image(
				`https://api.codeclimate.com/v1/badges/${user.codeclimateToken}/maintainability`,
				config.title,
				config.title,
			),
		],
	)
}

function ccCoverage(config, user) {
	return link(
		`https://codeclimate.com/${ccPath(user)}/test_coverage`,
		config.title,
		[
			image(
				`https://api.codeclimate.com/v1/badges/${user.codeclimateToken}/test_coverage`,
				config.title,
				config.title,
			),
		],
	)
}

/* eslint node/prefer-global/buffer: [error] */

function renderIcon(file, type) {
	const iconSource = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), file));
	const iconBuffer = Buffer.from(iconSource);

	return `&logo=${urlencode(`data:${type};base64,${iconBuffer.toString('base64')}`)}`
}

const renderIconSVG = id => renderIcon(`icons/${id}.svg`, 'image/svg+xml');

function libsRelease(config, user) {
	return link(
		`https://libraries.io/github/${user.github.slug}`,
		config.title,
		[
			image(
				`https://img.shields.io/librariesio/release/npm/${
					user.fullName
				}/latest?${config.icon && renderIconSVG('libraries-io')}`,
				config.title,
				config.title,
			),
		],
	)
}

function libsRepo(config, user) {
	return link(
		`https://libraries.io/github/${user.github.slug}`,
		config.title,
		[
			image(
				`https://img.shields.io/librariesio/github/${
					user.librariesIoName
				}?${config.icon && renderIconSVG('libraries-io')}`,
				config.title,
				config.title,
			),
		],
	)
}

function render$6(config, user) {
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

function render$5(config, user) {
	return link(
		`https://twitter.com/${user.twitter}`,
		config.title,
		[
			image(
				`https://img.shields.io/twitter/follow/${user.twitter}?style=social`,
				config.title,
				config.title,
			),
		],
	)
}

function render$4(config, user) {
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
				config.title,
			),
		],
	)
}

function render$3(config, user) {
	return link(
		`https://www.npmjs.com/package/${user.fullName}`,
		config.title,
		[
			image(
				`https://img.shields.io/npm/v/${user.fullName}?logo=npm`,
				config.title,
				config.title,
			),
		],
	)
}

function render$2(config) {
	return link(
		'https://github.com/rollup/rollup/wiki/pkg.module',
		config.title,
		[
			image(
				`https://img.shields.io/badge/es6-${
					urlencode('type: module ✔')
				}-64CA39?${config.icon && renderIconSVG('rollup')}`,
				config.title,
				config.title,
			),
		],
	)
}

// [snyk-badge]:https://snyk.io/test/github/thebespokepixel/es-tinycolor/badge.svg
// [snyk]: https://snyk.io/test/github/MarkGriffiths/meta

function render$1(config, user) {
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

// https://img.shields.io/travis/MarkGriffiths/badges.svg?branch=master&style=flat
// https://img.shields.io/travis/thebespokepixel/trucolor?logo=travis&style=flat-square
// https://img.shields.io/travis/thebespokepixel/trucolor/develop?style=flat&logo=travis
// https://travis-ci.org/MarkGriffiths/badges
//
function travis(config, user) {
	return link(
		`https://travis-ci.com/${user.github.slug}`,
		config.title,
		[
			image(
				`https://img.shields.io/travis/com/${user.github.slug}/${
					config.branch === 'dev' ? user.devBranch : config.branch
				}?logo=travis`,
				config.title,
				config.title,
			),
		],
	)
}

function travisPro(config, user) {
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
				config.title,
			),
		],
	)
}

/* ────────────────────────╮
 │ @thebespokepixel/badges │
 ╰─────────────────────────┴─────────────────────────────────────────────────── */

const services = {
	status: render$9,
	aux1: render$8,
	aux2: render$7,
	gitter: render$6,
	twitter: render$5,
	'code-climate': cc,
	'code-climate-coverage': ccCoverage,
	'libraries-io-npm': libsRelease,
	'libraries-io-github': libsRepo,
	inch: render$4,
	'inch-dev': render$4,
	npm: render$3,
	rollup: render$2,
	snyk: render$1,
	travis,
	'travis-dev': travis,
	'travis-com': travis,
	'travis-com-dev': travis,
	'travis-pro': travisPro,
	'travis-pro-dev': travisPro
};

function parseQueue(collection, providers, user) {
	if (Array.isArray(collection)) {
		if (Array.isArray(collection[0])) {
			return paragraph(collection.map(content => parseQueue(content, providers, user)))
		}
		const badges = collection.map(content => parseQueue(content, providers, user));
		badges.push(brk);
		return paragraph(badges)
	}

	if (_.isObject(collection)) {
		return _.map(collection, (content, title) => {
			return rootWithTitle(5, text(title), parseQueue(content, providers, user))
		})
	}

	if (!services[collection]) {
		throw new Error(`${collection} not found`)
	}

	return paragraph([services[collection](providers[collection], user), text(' ')])
}

/**
 * Render project badge configuration as markdown.
 * @param  {String} context The desired render context i.e: `readme`, `docs` as
 *                          defined in `package.json`.
 * @param  {Boolean} asAST  Render badges as {@link https://github.com/wooorm/mdast|MDAST}
 * @return {Promise}        A promise that resolves to the markdown formatted output.
 */
async function render(context, asAST = false) {
	const configArray = await Promise.all([
		packageConfig('badges'),
		readPackageUp()
	]);
	const config = configArray[0];
	const pkg = configArray[1].packageJson;

	if (!config.name || !config.github || !config.npm) {
		throw new Error('Badges requires at least a package name, github repo and npm user account.')
	}

	if (!config[context]) {
		throw new Error(`${context} is not provided in package.json.`)
	}

	if (!config.providers) {
		throw new Error('At least one badge provider must be specified.')
	}

	const badgeQueue = {
		user: {
			name: config.name,
			fullName: pkg.name,
			librariesIoName: `${config['libraries-io']}/${config.name}`,
			scoped: /^@.+?\//.test(pkg.name),
			github: {
				user: config.github,
				slug: `${config.github}/${config.name}`
			},
			npm: config.npm,
			twitter: config.twitter || config.github,
			devBranch: 'develop',
			codeclimateToken: config.codeclimate,
			codeclimateRepoToken: config['codeclimate-repo'],
			travisToken: config.travis
		},
		providers: _.forIn(_.defaultsDeep(config.providers, {
			status: {
				title: 'Status',
				text: 'badge',
				color: 'red',
				link: false
			},
			'aux-1': {
				title: 'Green',
				text: 'badge',
				color: 'green',
				link: false
			},
			'aux-2': {
				title: 'Blue',
				text: 'badge',
				color: 'blue',
				link: false
			},
			gitter: {
				title: 'Gitter',
				room: 'help'
			},
			twitter: {
				title: 'Twitter'
			},
			'code-climate': {
				title: 'Code-Climate'
			},
			'code-climate-coverage': {
				title: 'Code-Climate Coverage'
			},
			'libraries-io-npm': {
				title: 'Libraries.io',
				icon: true
			},
			'libraries-io-github': {
				title: 'Libraries.io',
				icon: true
			},
			inch: {
				title: 'Inch.io',
				branch: 'master'
			},
			'inch-dev': {
				title: 'Inch.io',
				branch: 'dev'
			},
			npm: {
				title: 'npm',
				icon: true
			},
			rollup: {
				title: 'Rollup',
				icon: true
			},
			snyk: {
				title: 'Snyk'
			},
			travis: {
				title: 'Travis',
				branch: 'master'
			},
			'travis-com': {
				title: 'Travis',
				branch: 'master'
			},
			'travis-pro': {
				title: 'Travis',
				branch: 'master'
			},
			'travis-dev': {
				title: 'Travis',
				branch: 'dev'
			},
			'travis-com-dev': {
				title: 'Travis',
				branch: 'dev'
			},
			'travis-pro-dev': {
				title: 'Travis',
				branch: 'dev'
			}
		}), value => _.defaultsDeep(value, {
			icon: false
		})),
		queue: config[context]
	};

	const ast = root(parseQueue(badgeQueue.queue, badgeQueue.providers, badgeQueue.user));

	if (asAST) {
		return ast
	}

	return remark().use(remarkGfm).use(remarkGap).use(remarkSqueeze).stringify(ast)
}

export { render as default };
