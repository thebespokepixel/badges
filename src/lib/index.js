/* ────────────────────────╮
 │ @thebespokepixel/badges │
 ╰─────────────────────────┴──────────────────────────────────────────────────── */

import pkgConf from 'pkg-conf'
import readPkg from 'read-pkg-up'
import remark from 'remark'
import node from 'unist-builder'


import bespoke from './providers/bespoke'
// import codeclimate from './providers/codeclimate'
// import david from './providers/david'
// import gitter from './providers/gitter'
// import inch from './providers/inch'
// import npm from './providers/npm'
// import rollup from './providers/rollup'
// import snyk from './providers/snyk'
// import travis from './providers/travis'

pkgConf('badges').then(config => {
	if (!config.name || !config.github || !config.npm) {
		throw new Error('Badges requires at least a package name, github repo and npm user account.')
	}
	const userConfig = {
		package: config.name,
		github: githubUser,
		npm: npmUser
	}

	console.log(name, githubUser, npmUser)
})

export default function render(context) {

}
