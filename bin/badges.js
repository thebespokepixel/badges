#! /usr/bin/env node
'use strict'

function _interopDefault(ex) {
	return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex
}

var fs = require('fs')
var trucolor = _interopDefault(require('trucolor'))
var truwrap = _interopDefault(require('truwrap'))
var commonTags = require('common-tags')
var _thebespokepixel_string = require('@thebespokepixel/string')
var meta = _interopDefault(require('@thebespokepixel/meta'))
var yargs = _interopDefault(require('yargs'))
var updateNotifier = _interopDefault(require('update-notifier'))
var appRootPath = require('app-root-path')
var verbosity = require('verbosity')

var name = '@thebespokepixel/badges'
var version = '0.0.1'
var description = 'documentation/readme badge generation and management'
var main = 'index.js'
var bin = {
	'compile-readme': './bin/badges.js'
}
var directories = {
	'test': 'test'
}
var files = ['index.js', 'lib']
var scripts = {
	'test': 'xo && snyk test && ava',
	'doc-serve': 'documentation serve --watch --theme node_modules/documentation-theme-bespoke --github --config src/docs/documentation.yml --name $npm_package_name  --project-version $npm_package_version src/index.js',
	'doc-build': 'documentation build --format html --output docs --theme node_modules/documentation-theme-bespoke --github --config src/docs/documentation.yml --name $npm_package_name  --project-version $npm_package_version src/index.js',
	'code-climate': 'nyc report --reporter=text-lcov | codeclimate-test-reporter',
	'coverage': 'nyc ava && nyc report --reporter=lcov --report-dir test/coverage; open test/coverage/lcov-report/index.html',
	'clean': 'gulp clean'
}
var repository = {
	'type': 'git',
	'url': 'git+https://github.com/MarkGriffiths/badges.git'
}
var keywords = ['readme', 'badges', 'documentation', 'docs']
var author = 'Mark Griffiths <mark@thebespokepixel.com> (http://thebespokepixel.com/)'
var license = 'MIT'
var bugs = {
	'url': 'https://github.com/MarkGriffiths/badges/issues'
}
var homepage = 'https://github.com/MarkGriffiths/badges#readme'
var dependencies = {
	'@thebespokepixel/meta': '^0.1.3',
	'@thebespokepixel/string': '^0.4.0',
	'app-root-path': '^2.0.1',
	'common-tags': '^1.3.1',
	'lodash': '^4.16.4',
	'mdast-util-inject': '^1.1.0',
	'pkg-conf': '^1.1.3',
	'read-pkg-up': '^1.0.1',
	'remark': '^6.0.1',
	'remark-squeeze-paragraphs': '^3.0.0',
	'semver': '^5.3.0',
	'trucolor': '^0.5.5',
	'truwrap': '^0.6.3',
	'unist-builder': '^1.0.2',
	'update-notifier': '^1.0.2',
	'urlencode': '^1.1.0',
	'verbosity': '^0.7.1',
	'yargs': '^6.0.0'
}
var devDependencies = {
	'@thebespokepixel/cordial': '^0.16.4',
	'ava': '^0.16.0',
	'codeclimate-test-reporter': '^0.4.0',
	'documentation': '^4.0.0-beta10',
	'documentation-theme-bespoke': '^0.2.1',
	'gulp': 'github:gulpjs/gulp#4.0',
	'nyc': '^8.3.1',
	'snyk': '^1.19.1',
	'xo': '^0.17.0'
}
var xo = {
	'semicolon': false,
	'esnext': true
}
var badges = {
	'github': 'MarkGriffiths',
	'npm': 'thebespokepixel',
	'name': 'badges',
	'style': 'flat',
	'providers': {
		'bespoke': {
			'title': 'status',
			'text': 'beta',
			'color': 'blue'
		}
	},
	'readme': {
		'Status': [['bespoke', 'npm', 'travis', 'david'], ['code-climate', 'code-climate-coverage', 'snyk']],
		'Developer': ['david-dev', 'rollup'],
		'Help': ['inch', 'gitter']
	},
	'docs': ['bespoke']
}
var buildNumber = 134
var engines = {
	'node': '>=4.0 <7.0'
}
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
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
	dependencies: dependencies,
	devDependencies: devDependencies,
	xo: xo,
	badges: badges,
	buildNumber: buildNumber,
	engines: engines,
	'jsnext:main': 'lib/index-es.js'
}

const console = verbosity.createConsole({
	outStream: process.stderr
})
const clr = trucolor.simplePalette()
const metadata = meta()

const renderer = truwrap({
	right: 4,
	outStream: process.stderr
})

const colorReplacer = new commonTags.TemplateTag(commonTags.replaceSubstitutionTransformer(/([a-zA-Z]+?)[:/|](.+)/, (match, colorName, content) => `${clr[colorName]}${content}${clr[colorName].out}`))

const title = _thebespokepixel_string.box(colorReplacer`${'title|compile-readme'}${`dim| │ ${metadata.version(3)}`}`, {
	borderColor: 'yellow',
	margin: {
		top: 1
	},
	padding: {
		bottom: 0,
		top: 0,
		left: 2,
		right: 2
	}
})

const usage = commonTags.stripIndent(colorReplacer)`${title}

	Tidy babel output to (something approaching) xo style. Mainly concerned with white space, indentation and ASI preferences.

	Works as a CLI tool (piping stdin → stdout) and a vinyl stream formatter for gulp/through2. The module offers 'formatText', 'formatStdin' and 'formatStream' methods.

	Just like xo, configuration data will be applied when found in package.json files as the file system is traversed back to the root.

	Usage:
	${'command|cat'} ${'argument|inputFile'} ${'operator:|'} ${'command|xo-tidy'} ${'option|[options]'} ${'operator|>'} ${'argument|outputFile'}
	${'dim|... or ...'}
	${'command|xo-tidy'} ${'option|[options]'} ${'operator|<'} ${'argument|inputFile'} ${'operator|>'} ${'argument|outputFile'}`

const epilogue = colorReplacer`${'green|© 2016'} ${'brightGreen|The Bespoke Pixel.'} ${'grey|Released under the MIT License.'}`

yargs.strict().options({
	h: {
		alias: 'help',
		describe: 'Display help.'
	},
	v: {
		alias: 'version',
		count: true,
		describe: 'Print version to stdout. -vv Print name & version.'
	},
	V: {
		alias: 'verbose',
		count: true,
		describe: 'Be verbose. -VV Be loquacious.'
	},
	lint: {
		describe: 'Output linting information, rather than formatted output.'
	},
	esnext: {
		describe: 'Enable ES2015+ rule formatting.'
	},
	semicolon: {
		describe: 'Use --no-semicolon to strip semicolons normally handled by ASI.'
	},
	space: {
		describe: 'Specify number of spaces to indent instead of [tab].',
		nargs: 1,
		default: false
	},
	xopath: {
		describe: 'Path to start searching for xo configuration.',
		nargs: 1,
		default: '.'
	},
	out: {
		describe: 'Output path for tidied files. Will overwrite originals if set to the source path.',
		nargs: 1,
		default: '.'
	},
	color: {
		describe: 'Force color output. Disable with --no-color'
	}
}).wrap(renderer.getWidth())

const argv = yargs.argv

if (!(process.env.USER === 'root' && process.env.SUDO_USER !== process.env.USER)) {
	updateNotifier({
		pkg
	}).notify()
}

if (argv.help) {
	renderer.write(usage)
	renderer.break(2)
	renderer.write(yargs.getUsageInstance().help())
	renderer.break()
	renderer.write(epilogue)
	renderer.break(1)
	process.exit(0)
}

if (argv.version) {
	process.stdout.write(metadata.version(argv.version))
	process.exit(0)
}

if (argv.verbose) {
	switch (argv.verbose) {
		case 1:
			console.verbosity(4)
			console.log(`${clr.title}Verbose mode${clr.title.out}:`)
			break
		case 2:
			console.verbosity(5)
			console.log(`${clr.title}Extra-Verbose mode${clr.title.out}:`)
			console.yargs(argv)
			break
		default:
			console.verbosity(3)
	}
}
