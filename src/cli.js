/* eslint unicorn/no-process-exit:0, import/extensions:0 */

import {readFileSync} from 'fs'
import trucolor from 'trucolor'
import truwrap from 'truwrap'
import {stripIndent, TemplateTag, replaceSubstitutionTransformer} from 'common-tags'
import {box} from '@thebespokepixel/string'
import meta from '@thebespokepixel/meta'
import yargs from 'yargs'
import updateNotifier from 'update-notifier'
import appRoot from 'app-root-path'
import {createConsole} from 'verbosity'
import pkg from '../package.json'

const console = createConsole({outStream: process.stderr})
const clr = trucolor.simplePalette()
const metadata = meta()

const renderer = truwrap({
	right: 4,
	outStream: process.stderr
})

const colorReplacer = new TemplateTag(
	replaceSubstitutionTransformer(
		/([a-zA-Z]+?)[:/|](.+)/,
		(match, colorName, content) => `${clr[colorName]}${content}${clr[colorName].out}`
	)
)

const title = box(colorReplacer`${'title|compile-readme'}${`dim| │ ${metadata.version(3)}`}`, {
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

const usage = stripIndent(colorReplacer)`${title}

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
