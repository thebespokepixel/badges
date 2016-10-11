import pkgConf from 'pkg-conf';
import 'read-pkg-up';
import 'remark';
import node from 'unist-builder';

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

export default render;