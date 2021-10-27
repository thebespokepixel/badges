#! /usr/bin/env -S node
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
import { remark } from 'remark';
import remarkGap from 'remark-heading-gap';
import remarkSqueeze from 'remark-squeeze-paragraphs';
import { packageConfig } from 'pkg-conf';
import { readPackageUp } from 'read-pkg-up';
import { u } from 'unist-builder';
import remarkGfm from 'remark-gfm';
import urlencode from 'urlencode';

const name = "@thebespokepixel/badges";
const version = "3.0.2";
const description = "documentation/readme badge generation and management";
const main = "index.js";
const type = "module";
const bin = {
	"compile-readme": "./bin/compile-readme.js"
};
const directories = {
	test: "test"
};
const files = [
	"index.js",
	"index.mjs",
	"icons",
	"bin"
];
const scripts = {
	build: "rollup -c && chmod 755 bin/compile-readme.js",
	test: "xo && c8 --reporter=lcov --reporter=text ava",
	"doc-serve": "documentation serve --watch -github --config src/docs/documentation.yml --project-name $npm_package_name  --project-version $npm_package_version src/index.js",
	"doc-build": "documentation build --format html --output docs/ --github --config src/docs/documentation.yml --project-name $npm_package_name  --project-version $npm_package_version src/index.js",
	readme: "./bin/compile-readme.js -u src/docs/example.md src/docs/readme.md > readme.md",
	coverage: "c8 --reporter=lcov --reporter=text ava",
	"generate-types": "npx -p typescript tsc index.js --declaration --allowJs --emitDeclarationOnly"
};
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
	"mdast-util-inject": "^1.1.0",
	"pkg-conf": "^4.0.0",
	"read-pkg-up": "^9.0.0",
	remark: "^14.0.1",
	"remark-heading-gap": "^5.0.0",
	"remark-squeeze-paragraphs": "^5.0.0",
	"remark-usage": "^10.0.1",
	trucolor: "^2.0.4",
	truwrap: "^2.0.4",
	"unist-builder": "^3.0.0",
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
	"remark-gfm": "^3.0.0",
	rollup: "^2.58.3",
	xo: "^0.46.0"
};
const xo = {
	semicolon: false,
	ignores: [
		"gulpfile.js",
		"index.js",
		"bin/compile-readme.js",
		"lib/**",
		"docs/**",
		"src/docs/example.js",
		"test/coverage/**"
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
function render$9(config) {
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

function render$7(config, user) {
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

function render$6(config, user) {
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

function render$5(config, user) {
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

function render$4(config, user) {
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

function render$3(config) {
	return u('link', {
		title: _.upperFirst(config.title),
		url: 'https://github.com/rollup/rollup/wiki/pkg.module',
	}, [
		u('image', {
			alt: _.upperFirst(config.title),
			url: `https://img.shields.io/badge/es6-${
				urlencode('module:mjs_✔')
			}-64CA39?${config.icon && renderIconSVG('rollup')}`,
		}),
	])
}

// [snyk-badge]:https://snyk.io/test/github/thebespokepixel/es-tinycolor/badge.svg
// [snyk]: https://snyk.io/test/github/MarkGriffiths/meta

function render$2(config, user) {
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
	'travis-com': travisCom,
	'travis-com-dev': travisCom,
	'travis-pro': travisPro,
	'travis-pro-dev': travisPro
};

function parseQueue(collection, providers, user) {
	if (Array.isArray(collection)) {
		const badges = _.flatten(collection.map(content => [parseQueue(content, providers, user), u('text', ' ')]));
		badges.push(u('text', ' \n'));
		return u('paragraph', {}, badges)
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

	const page = await remark().use(remarkGap).use(remarkSqueeze).process(template(content));
	process.stdout.write(page.toString());
}

const source = resolve(argv._[0]);
console.debug('Source path:', source);
render(_.template(readFileSync(source)));
