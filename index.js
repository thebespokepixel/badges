import _ from 'lodash';
import { packageConfig } from 'pkg-conf';
import { readPackageUp } from 'read-pkg-up';
import { remark } from 'remark';
import { u } from 'unist-builder';
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
	const badgeNode = u('image', {
		alt: _.upperFirst(config.title),
		url: `https://img.shields.io/badge/status-${
			config.text
		}-${
			config.color
		}`,
	});

	if (config.link) {
		return u('link', {
			title: _.upperFirst(config.title),
			url: config.link,
		}, [
			badgeNode,
		])
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
	const badgeNode = u('image', {
		alt: _.upperFirst(config.title),
		url: `https://img.shields.io/badge/${
			config.title
		}-${
			config.text
		}-${
			config.color
		}`,
	});

	if (config.link) {
		return u('link', {
			title: _.upperFirst(config.title),
			url: config.link,
		}, [
			badgeNode,
		])
	}

	return badgeNode
}

/**
 * Render a auxillary badge.
 * @private
 * @param  {Object} config Configuration object.
 * @return {Node}          MDAST node containing badge.
 */
function render$7(config) {
	const badgeNode = u('image', {
		alt: _.upperFirst(config.title),
		url: `https://img.shields.io/badge/${
			config.title
		}-${
			config.text
		}-${
			config.color
		}`,
	});

	if (config.link) {
		return u('link', {
			title: _.upperFirst(config.title),
			url: config.link,
		}, [
			badgeNode,
		])
	}

	return badgeNode
}

function ccPath(user) {
	return user.codeclimateRepoToken
		? `repos/${user.codeclimateRepoToken}`
		: `github/${user.github.slug}`
}

function cc(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://codeclimate.com/${ccPath(user)}/maintainability`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://api.codeclimate.com/v1/badges/${
				user.codeclimateToken
			}/maintainability`,
		}),
	])
}

function ccCoverage(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://codeclimate.com/${ccPath(user)}/test_coverage`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: 'https://api.codeclimate.com/v1/badges/' + user.codeclimateToken + '/test_coverage',
		}),
	])
}

/* eslint node/prefer-global/buffer: [error] */

function renderIcon(file, type) {
	const iconSource = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), file));
	const iconBuffer = Buffer.from(iconSource);

	return `&logo=${urlencode(`data:${type};base64,${iconBuffer.toString('base64')}`)}`
}

const renderIconSVG = id => renderIcon(resolve(`icons/${id}.svg`), 'image/svg+xml');

function libsRelease(config, user) {
	return u('link', {
		title: config.title,
		url: `https://libraries.io/github/${
			user.github.slug
		}`,
	}, [
		u('image', {
			alt: config.title,
			url: `https://img.shields.io/librariesio/release/npm/${
				user.fullName
			}/latest?${config.icon && renderIconSVG('libraries-io')}`,
		}),
	])
}

function libsRepo(config, user) {
	return u('link', {
		title: config.title,
		url: `https://libraries.io/github/${
			user.github.slug
		}`,
	}, [
		u('image', {
			alt: config.title,
			url: `https://img.shields.io/librariesio/github/${
				user.librariesIoName
			}?${config.icon && renderIconSVG('libraries-io')}`,
		}),
	])
}

function render$6(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://gitter.im/${
			user.github.user
		}/${
			config.room
		}?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/gitter/room/${
				user.github.user
			}/${
				config.room
			}`,
		}),
	])
}

function render$5(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://twitter.com/${
			user.twitter
		}`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/twitter/follow/${
				user.twitter
			}?style=social`,
		}),
	])
}

function render$4(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://inch-ci.org/github/${
			user.github.slug
		}`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://inch-ci.org/github/${
				user.github.slug
			}.svg?branch=${
				config.branch === 'dev' ? user.devBranch : config.branch
			}&style=shields`,
		}),
	])
}

function render$3(config, user) {
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

function render$2(config) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: 'https://github.com/rollup/rollup/wiki/pkg.module',
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/badge/es6-${
				urlencode('type: module: ✔')
			}-64CA39?${config.icon && renderIconSVG('rollup')}`,
		}),
	])
}

// [snyk-badge]:https://snyk.io/test/github/thebespokepixel/es-tinycolor/badge.svg
// [snyk]: https://snyk.io/test/github/MarkGriffiths/meta

function render$1(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://snyk.io/test/github/${
			user.github.slug
		}`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://snyk.io/test/github/${
				user.github.slug
			}/badge.svg`,
		}),
	])
}

// https://img.shields.io/travis/MarkGriffiths/badges.svg?branch=master&style=flat
// https://img.shields.io/travis/thebespokepixel/trucolor?logo=travis&style=flat-square
// https://img.shields.io/travis/thebespokepixel/trucolor/develop?style=flat&logo=travis
// https://travis-ci.org/MarkGriffiths/badges

function travis(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://travis-ci.org/${
			user.github.slug
		}`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/travis/${
				user.github.slug
			}/${
				config.branch === 'dev' ? user.devBranch : config.branch
			}?logo=travis`,
		}),
	])
}

function travisCom(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://travis-ci.com/${
			user.github.slug
		}`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/travis/com/${
				user.github.slug
			}/${
				config.branch === 'dev' ? user.devBranch : config.branch
			}?logo=travis`,
		}),
	])
}

function travisPro(config, user) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: `https://travis-ci.com/${
			user.github.slug
		}`,
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://api.travis-ci.com/${
				user.github.slug
			}.svg?branch=${
				config.branch === 'dev' ? user.devBranch : config.branch
			}&token=${
				user.travisToken
			}`,
		}),
	])
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
	'travis-com': travisCom,
	'travis-com-dev': travisCom,
	'travis-pro': travisPro,
	'travis-pro-dev': travisPro
};

function parseQueue(collection, providers, user) {
	if (Array.isArray(collection)) {
		const badges = _.flatten(collection.map(content => [parseQueue(content, providers, user), u('text', ' ')]));
		badges.push(u('text', '  \n'));
		return u('paragraph', badges)
	}

	if (_.isObject(collection)) {
		return _.map(collection, (content, title) => {
			return u('root', [
				u('heading', {
					depth: 5
				}, [
					u('text', title)
				]),
				parseQueue(content, providers, user)
			])
		})
	}

	if (!services[collection]) {
		throw new Error(`${collection} not found`)
	}

	return services[collection](providers[collection], user)
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
				title: 'status',
				text: 'badge',
				color: 'red',
				link: false
			},
			'aux-1': {
				title: 'aux1',
				text: 'badge',
				color: 'green',
				link: false
			},
			'aux-2': {
				title: 'aux2',
				text: 'badge',
				color: 'blue',
				link: false
			},
			gitter: {
				title: 'gitter',
				room: 'help'
			},
			twitter: {
				title: 'twitter'
			},
			'code-climate': {
				title: 'code-climate'
			},
			'code-climate-coverage': {
				title: 'coverage'
			},
			'libraries-io-npm': {
				title: 'libraries-io',
				icon: true
			},
			'libraries-io-github': {
				title: 'libraries-io',
				icon: true
			},
			inch: {
				title: 'inch',
				branch: 'master'
			},
			'inch-dev': {
				title: 'inch',
				branch: 'dev'
			},
			npm: {
				title: 'npm',
				icon: true
			},
			rollup: {
				title: 'rollup',
				icon: true
			},
			snyk: {
				title: 'snyk'
			},
			travis: {
				title: 'travis',
				branch: 'master'
			},
			'travis-com': {
				title: 'travis',
				branch: 'master'
			},
			'travis-pro': {
				title: 'travis',
				branch: 'master'
			},
			'travis-dev': {
				title: 'travis',
				branch: 'dev'
			},
			'travis-com-dev': {
				title: 'travis',
				branch: 'dev'
			},
			'travis-pro-dev': {
				title: 'travis',
				branch: 'dev'
			}
		}), value => _.defaultsDeep(value, {
			icon: false
		})),
		queue: config[context]
	};

	const ast = u('root', parseQueue(badgeQueue.queue, badgeQueue.providers, badgeQueue.user));

	if (asAST) {
		return ast
	}

	return remark().use(remarkGfm).use(remarkGap).use(remarkSqueeze).stringify(ast)
}

export { render as default };
