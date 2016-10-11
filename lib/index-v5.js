'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var pkgConf = _interopDefault(require('pkg-conf'));
var readPkgUp = require('read-pkg-up');
var remark = require('remark');
var node = _interopDefault(require('unist-builder'));

pkgConf('badges').then(config => {
	if (!config.name || !config.github || !config.npm) {
		throw new Error('Badges requires at least a package name, github repo and npm user account.');
	}
	const userConfig = {
		package: config.name,
		github: githubUser,
		npm: npmUser
	};

	console.log(name, githubUser, npmUser);
});

function render(context) {}

module.exports = render;