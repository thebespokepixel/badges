/* ────────────────────────╮
 │ @thebespokepixel/badges │
 ╰─────────────────────────┴─────────────────────────────────────────────────── */

import _ from 'lodash'
import pkgConf from 'pkg-conf'
import readPkg from 'read-pkg-up'
import remark from 'remark'
import node from 'unist-builder'
import gap from 'remark-heading-gap'
import squeeze from 'remark-squeeze-paragraphs'
import status from './lib/providers/status'
import aux1 from './lib/providers/aux-1'
import aux2 from './lib/providers/aux-2'
import {cc, ccCoverage} from './lib/providers/codeclimate'
import {david, davidDevDeps} from './lib/providers/david'
import gitter from './lib/providers/gitter'
import twitter from './lib/providers/twitter'
import inch from './lib/providers/inch'
import npm from './lib/providers/npm'
import rollup from './lib/providers/rollup'
import snyk from './lib/providers/snyk'
import {greenkeeper, greenkeeperPro} from './lib/providers/greenkeeper'
import {travis, travisCom, travisPro} from './lib/providers/travis'

const services = {
	status,
	aux1,
	aux2,
	gitter,
	twitter,
	'code-climate': cc,
	'code-climate-coverage': ccCoverage,
	david,
	'david-dev': david,
	'david-devdeps': davidDevDeps,
	'david-devdeps-dev': davidDevDeps,
	inch,
	'inch-dev': inch,
	npm,
	rollup,
	snyk,
	greenkeeper,
	'greenkeeper-pro': greenkeeperPro,
	travis,
	'travis-dev': travis,
	'travis-com': travisCom,
	'travis-com-dev': travisCom,
	'travis-pro': travisPro,
	'travis-pro-dev': travisPro
}

function parseQueue(collection, providers, user) {
	if (Array.isArray(collection)) {
		const badges = _.flatten(collection.map(content => [parseQueue(content, providers, user), node('text', ' ')]))
		badges.push(node('break'))
		return node('paragraph', badges)
	}

	if (_.isObject(collection)) {
		return _.map(collection, (content, title) => {
			return node('root', [
				node('heading', {
					depth: 5
				}, [
					node('text', title)
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
export default async function render(context, asAST = false) {
	const configArray = await Promise.all([
		pkgConf('badges'),
		readPkg()
	])
	const config = configArray[0]
	const pkg = configArray[1].package

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
			travisToken: config.travis,
			greenkeeperToken: config.greenkeeper
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
			david: {
				title: 'david',
				branch: 'master'
			},
			'david-devdeps': {
				title: 'david-developer',
				branch: 'master'
			},
			'david-dev': {
				title: 'david',
				branch: 'dev'
			},
			'david-devdeps-dev': {
				title: 'david-developer',
				branch: 'dev'
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
			greenkeeper: {
				title: 'greenkeeper'
			},
			'greenkeeper-pro': {
				title: 'greenkeeper'
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
	}

	const ast = node('root', parseQueue(badgeQueue.queue, badgeQueue.providers, badgeQueue.user))

	if (asAST) {
		return ast
	}

	return remark().use(gap).use(squeeze).stringify(ast)
}
