#! /usr/bin/env node
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import { simple } from 'trucolor';
import { truwrap } from 'truwrap';
import { TemplateTag, replaceSubstitutionTransformer, stripIndent } from 'common-tags';
import { box } from '@thebespokepixel/string';
import meta from '@thebespokepixel/meta';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import updateNotifier from 'update-notifier';
import { createConsole } from 'verbosity';
import { packageConfig } from 'pkg-conf';
import { readPackageUp } from 'read-pkg-up';
import { remark } from 'remark';
import { image, link, root, paragraph, brk, rootWithTitle, text } from 'mdast-builder';
import remarkGap from 'remark-heading-gap';
import remarkSqueeze from 'remark-squeeze-paragraphs';
import remarkGfm from 'remark-gfm';
import urlencode from 'urlencode';

const name = "@thebespokepixel/badges";
const version = "4.0.3";
const description = "documentation/readme badge generation and management";
const main = "index.js";
const type = "module";
const bin = {
	"compile-readme": "./compile-readme.js"
};
const directories = {
	test: "test"
};
const files = [
	"index.js",
	"index.d.ts",
	"icons",
	"bin"
];
const scripts = {
	build: "rollup -c && chmod 755 compile-readme.js",
	test: "xo && c8 --reporter=text ava",
	"doc-build": "echo 'No Documentation to build'",
	readme: "./compile-readme.js -u src/docs/example.md src/docs/readme.md > readme.md",
	coverage: "c8 --reporter=lcov ava; open test/coverage/lcov-report/index.html",
	"generate-types": "npx -p typescript tsc index.js --declaration --allowJs --emitDeclarationOnly"
};
const prepublish = "npx -p typescript tsc index.js --declaration --allowJs --emitDeclarationOnly";
const repository = {
	type: "git",
	url: "git+https://github.com/thebespokepixel/badges.git"
};
const keywords = [
	"readme",
	"badges",
	"documentation",
	"docs"
];
const author = "Mark Griffiths <mark@thebespokepixel.com> (http://thebespokepixel.com/)";
const license = "MIT";
const bugs = {
	url: "https://github.com/thebespokepixel/badges/issues"
};
const homepage = "https://github.com/thebespokepixel/badges#readme";
const copyright = {
	year: "2021",
	owner: "The Bespoke Pixel"
};
const dependencies = {
	"@thebespokepixel/meta": "^2.0.4",
	"@thebespokepixel/string": "^1.0.3",
	"common-tags": "^1.8.0",
	lodash: "^4.17.21",
	"pkg-conf": "^4.0.0",
	"read-pkg-up": "^9.0.0",
	remark: "^14.0.1",
	"remark-heading-gap": "^5.0.0",
	"remark-squeeze-paragraphs": "^5.0.0",
	trucolor: "^2.0.4",
	truwrap: "^2.0.4",
	"mdast-builder": "^1.1.1",
	"remark-gfm": "^3.0.0",
	"update-notifier": "^5.1.0",
	urlencode: "^1.1.0",
	verbosity: "^2.0.2",
	yargs: "^17.2.1"
};
const devDependencies = {
	"@rollup/plugin-commonjs": "^21.0.1",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.0.6",
	ava: "^4.0.0-alpha.2",
	c8: "^7.10.0",
	rollup: "^2.58.3",
	xo: "^0.46.3"
};
const xo = {
	semicolon: false,
	ignores: [
		"gulpfile.js",
		"index.js",
		"index.d.ts",
		"compile-readme.js",
		"lib/**",
		"docs/**",
		"src/docs/example.js",
		"coverage/**"
	]
};
const badges = {
	github: "thebespokepixel",
	npm: "thebespokepixel",
	"libraries-io": "TheBespokePixel",
	codeclimate: "07f2fcfc32f33b4acc05",
	name: "badges",
	devBranch: "develop",
	providers: {
		status: {
			text: "production",
			color: "green"
		},
		aux1: {
			title: "github",
			text: "source",
			color: "4E73B6",
			link: "https://github.com/thebespokepixel/badges"
		}
	},
	"test-1": [
		"status"
	],
	readme: {
		"Publishing Status": [
			[
				"status",
				"npm",
				"libraries-io-npm"
			],
			[
				"travis-com",
				"rollup"
			]
		],
		"Development Status": [
			[
				"travis-com-dev",
				"libraries-io-github"
			],
			[
				"snyk",
				"code-climate",
				"code-climate-coverage"
			]
		],
		"Documentation/Help": [
			"twitter"
		]
	},
	docs: [
		[
			"aux1"
		],
		[
			"travis-com"
		],
		[
			"david"
		],
		[
			"code-climate-coverage"
		],
		[
			"inch"
		]
	]
};
const engines = {
	node: ">=14.0"
};
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	type: type,
	bin: bin,
	directories: directories,
	files: files,
	scripts: scripts,
	prepublish: prepublish,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	bugs: bugs,
	homepage: homepage,
	copyright: copyright,
	dependencies: dependencies,
	devDependencies: devDependencies,
	xo: xo,
	badges: badges,
	engines: engines
};

/**
 * Render a status badge.
 * @private
 * @param  {Object} config Configuration object.
 * @return {Node}          MDAST node containing badge.
 */
function render$a(config) {
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
function render$9(config) {
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

function render$7(config, user) {
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

function render$6(config, user) {
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

function render$5(config, user) {
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

function render$4(config, user) {
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

function render$3(config) {
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

function render$2(config, user) {
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
	status: render$a,
	aux1: render$9,
	aux2: render$8,
	gitter: render$7,
	twitter: render$6,
	'code-climate': cc,
	'code-climate-coverage': ccCoverage,
	'libraries-io-npm': libsRelease,
	'libraries-io-github': libsRepo,
	inch: render$5,
	'inch-dev': render$5,
	npm: render$4,
	rollup: render$3,
	snyk: render$2,
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
async function render$1(context, asAST = false) {
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

/* eslint unicorn/no-process-exit:0, import/extensions:0, node/prefer-global/process: [error] */

const console = createConsole({outStream: process.stderr});
const clr = simple({format: 'sgr'});
const metadata = meta(dirname(fileURLToPath(import.meta.url)));

const renderer = truwrap({
	right: 4,
	outStream: process.stderr,
});

const colorReplacer = new TemplateTag(
	replaceSubstitutionTransformer(
		/([a-zA-Z]+?)[:/|](.+)/,
		(match, colorName, content) => `${clr[colorName]}${content}${clr[colorName].out}`,
	),
);

const title = box(colorReplacer`${'title|compile-readme'}${`dim| │ ${metadata.version(3)}`}`, {
	borderColor: 'yellow',
	margin: {
		top: 1,
	},
	padding: {
		bottom: 0,
		top: 0,
		left: 2,
		right: 2,
	},
});

const usage = stripIndent(colorReplacer)`
	Inject project badges into a tagged markdown-formatted source file.

	Usage:
	${'command|compile-readme'} ${'option|[options]'} ${'operator|>'} ${'argument|outputFile'}`;

const epilogue = colorReplacer`${'brightGreen|' + metadata.copyright} ${'grey|Released under the MIT License.'}`;

const yargsInstance = yargs(hideBin(process.argv))
	.strictOptions()
	.help(false)
	.version(false)
	.options({
		h: {
			alias: 'help',
			describe: 'Display help.',
		},
		v: {
			alias: 'version',
			count: true,
			describe: 'Print version to stdout. -vv Print name & version.',
		},
		V: {
			alias: 'verbose',
			count: true,
			describe: 'Be verbose. -VV Be loquacious.',
		},
		c: {
			alias: 'context',
			default: 'readme',
			describe: 'The named badges context in package.json.',
		},
		u: {
			alias: 'usage',
			describe: 'Path to a markdown usage example',
		},
		color: {
			describe: 'Force color output. Disable with --no-color',
		},
	});

const {argv} = yargsInstance;

if (!(process.env.USER === 'root' && process.env.SUDO_USER !== process.env.USER)) {
	updateNotifier({
		pkg,
	}).notify();
}

if (argv._.length === 0) {
	argv.help = true;
}

if (argv.help) {
	(async () => {
		const usageContent = await yargsInstance.getHelp().wrap(renderer.getWidth());
		renderer.write(title).break(2);
		renderer.write(usage);
		renderer.break(2);
		renderer.write(usageContent);
		renderer.break(2);
		renderer.write(epilogue);
		renderer.break(2);
		process.exit(0);
	})();
}

if (argv.version) {
	process.stdout.write(metadata.version(argv.version));
	process.exit(0);
}

if (argv.verbose) {
	switch (argv.verbose) {
		case 1:
			console.verbosity(4);
			console.log(`${clr.title}Verbose mode${clr.title.out}:`);
			break
		case 2:
			console.verbosity(5);
			console.log(`${clr.title}Extra-Verbose mode${clr.title.out}:`);
			console.yargs(argv);
			break
		default:
			console.verbosity(3);
	}
}

/**
 * Render the page to stdout
 * @param  {lodash} template A processed lodash template of the source
 */
async function render(template) {
	const content = {
		badges: await render$1(argv.context),
		usage: '',
	};

	if (argv.usage) {
		content.usage = readFileSync(resolve(argv.usage));
	}

	process.stdout.write(template(content).replace(/\\\n/g, '  \n'));
}

const source = resolve(argv._[0]);
console.debug('Source path:', source);
render(_.template(readFileSync(source)));
