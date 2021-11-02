/* ────────────────────────╮
 │ @thebespokepixel/badges │
 ╰─────────────────────────┴─────────────────────────────────────────────────── */

import _ from 'lodash'
import {packageConfig} from 'pkg-conf'
import {readPackageUp} from 'read-pkg-up'
import {remark} from 'remark'
import {
  root,
  rootWithTitle,
  paragraph,
  text,
  brk
} from 'mdast-builder'
import remarkGap from 'remark-heading-gap'
import remarkSqueeze from 'remark-squeeze-paragraphs'
import remarkGfm from 'remark-gfm'
import status from './lib/providers/status'
import aux1 from './lib/providers/aux-1'
import aux2 from './lib/providers/aux-2'
import {cc, ccCoverage} from './lib/providers/codeclimate'
import {libsRelease, libsRepo} from './lib/providers/libraries-io'
import gitter from './lib/providers/gitter'
import twitter from './lib/providers/twitter'
import inch from './lib/providers/inch'
import npm from './lib/providers/npm'
import rollup from './lib/providers/rollup'
import snyk from './lib/providers/snyk'
import {travis, travisPro} from './lib/providers/travis'

const services = {
	status,
	aux1,
	aux2,
	gitter,
	twitter,
	'code-climate': cc,
	'code-climate-coverage': ccCoverage,
	'libraries-io-npm': libsRelease,
	'libraries-io-github': libsRepo,
	inch,
	'inch-dev': inch,
	npm,
	rollup,
	snyk,
	travis,
	'travis-dev': travis,
	'travis-com': travis,
	'travis-com-dev': travis,
	'travis-pro': travisPro,
	'travis-pro-dev': travisPro
}

function parseQueue(collection, providers, user) {
	if (Array.isArray(collection)) {
		if (Array.isArray(collection[0])) {
			return paragraph(collection.map(content => parseQueue(content, providers, user)))
		}
		const badges = collection.map(content => parseQueue(content, providers, user))
		badges.push(brk)
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
 * @param  {string} context The desired render context i.e: `readme`, `docs` as
 *                          defined in `package.json`.
 * @param  {boolean} asAST  Render badges as {@link https://github.com/wooorm/mdast|MDAST}
 * @return {Promise}        A promise that resolves to the markdown formatted output.
 */
export default async function render(context, asAST = false) {
	const configArray = await Promise.all([
		packageConfig('badges'),
		readPackageUp()
	])
	const config = configArray[0]
	const pkg = configArray[1].packageJson

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
	}

	const ast = root(parseQueue(badgeQueue.queue, badgeQueue.providers, badgeQueue.user))

	if (asAST) {
		return ast
	}

	return remark().use(remarkGfm).use(remarkGap).use(remarkSqueeze).stringify(ast)
}
