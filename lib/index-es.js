import _defaultsDeep from 'lodash/defaultsDeep';
import _forIn from 'lodash/forIn';
import _map from 'lodash/map';
import _isObject from 'lodash/isObject';
import _flatten from 'lodash/flatten';
import pkgConf from 'pkg-conf';
import readPkg from 'read-pkg-up';
import remark from 'remark';
import node from 'unist-builder';
import squeeze from 'remark-squeeze-paragraphs';
import _upperFirst from 'lodash/upperFirst';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import urlencode from 'urlencode';
import { gte } from 'semver';

function render$1(config) {
	const badgeNode = node('image', {
		alt: _upperFirst(config.title),
		url: `https://img.shields.io/badge/status-${ config.text }-${ config.color }.svg?style=${ config.style }`
	});

	if (config.link) {
		return node('link', {
			title: _upperFirst(config.title),
			url: config.link
		}, [badgeNode]);
	}

	return badgeNode;
}

function render$2(config) {
	const badgeNode = node('image', {
		alt: _upperFirst(config.title),
		url: `https://img.shields.io/badge/${ config.title }-${ config.text }-${ config.color }.svg?style=${ config.style }`
	});

	if (config.link) {
		return node('link', {
			title: _upperFirst(config.title),
			url: config.link
		}, [badgeNode]);
	}

	return badgeNode;
}

function render$3(config) {
	const badgeNode = node('image', {
		alt: _upperFirst(config.title),
		url: `https://img.shields.io/badge/${ config.title }-${ config.text }-${ config.color }.svg?style=${ config.style }`
	});

	if (config.link) {
		return node('link', {
			title: _upperFirst(config.title),
			url: config.link
		}, [badgeNode]);
	}

	return badgeNode;
}

function cc(config, user) {
	return node('link', {
		title: _upperFirst(config.title),
		url: `https://codeclimate.com/github/${ user.github.slug }`
	}, [node('image', {
		alt: _upperFirst(config.title),
		url: `https://codeclimate.com/github/${ user.github.slug }/badges/gpa.svg?style=${ config.style }`
	})]);
}

function ccCoverage(config, user) {
	return node('link', {
		title: _upperFirst(config.title),
		url: `https://codeclimate.com/github/${ user.github.slug }/coverage`
	}, [node('image', {
		alt: _upperFirst(config.title),
		url: `https://codeclimate.com/github/${ user.github.slug }/badges/coverage.svg?style=${ config.style }`
	})]);
}

function david(config, user) {
	return node('link', {
		title: _upperFirst(config.title),
		url: `https://david-dm.org/${ user.github.slug }/${ config.branch }`
	}, [node('image', {
		alt: _upperFirst(config.title),
		url: `https://img.shields.io/david/${ user.github.slug }.svg?branch=${ config.branch }&style=${ config.style }`
	})]);
}

function davidDev(config, user) {
	return node('link', {
		title: _upperFirst(config.title),
		url: `https://david-dm.org/${ user.github.slug }/${ config.branch }#info=devDependencies`
	}, [node('image', {
		alt: _upperFirst(config.title),
		url: `https://img.shields.io/david/dev/${ user.github.slug }.svg?branch=${ config.branch }&style=${ config.style }`
	})]);
}

function render$4(config, user) {
	return node('link', {
		title: _upperFirst(config.title),
		url: `https://gitter.im/${ user.github.user }/${ config.room }?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge`
	}, [node('image', {
		alt: _upperFirst(config.title),
		url: `https://img.shields.io/gitter/room/${ user.github.user }/${ config.room }.svg?style=${ config.style }`
	})]);
}

function render$5(config, user) {
	return node('link', {
		title: _upperFirst(config.title),
		url: `https://inch-ci.org/github/${ user.github.slug }`
	}, [node('image', {
		alt: _upperFirst(config.title),
		url: `https://inch-ci.org/github/${ user.github.slug }.svg?branch=${ config.branch }&style=${ config.style }`
	})]);
}

function renderIconSVG(id) {
	const iconSource = readFileSync(resolve(__dirname, `../icons/${ id }.svg`));
	const iconBuffer = gte(process.version, '6.0.0') ? Buffer.from(iconSource) : new Buffer(iconSource);

	return `&logo=${ urlencode(`data:image/svg+xml;base64,${ iconBuffer.toString('base64') }`) }`;
}

function render$6(config, user) {
	return node('link', {
		title: config.title,
		url: `https://www.npmjs.com/package/${ user.fullName }`
	}, [node('image', {
		alt: config.title,
		url: `https://img.shields.io/npm/v/${ user.fullName }.svg?style=${ config.style }${ config.icon && renderIconSVG('npm') }`
	})]);
}

function render$7(config) {
	return node('link', {
		title: _upperFirst(config.title),
		url: `https://github.com/rollup/rollup/wiki/jsnext:main`
	}, [node('image', {
		alt: _upperFirst(config.title),
		url: `https://img.shields.io/badge/es2015-${ urlencode('jsnext:main_✔') }-64CA39.svg?style=${ config.style }${ config.icon && renderIconSVG('rollup') }`
	})]);
}

function render$8(config, user) {
	return node('link', {
		title: _upperFirst(config.title),
		url: `https://snyk.io/test/github/${ user.github.slug }`
	}, [node('image', {
		alt: _upperFirst(config.title),
		url: `https://snyk.io/test/github/${ user.github.slug }/badge.svg?style=${ config.style }`
	})]);
}

function render$9(config, user) {
	return node('link', {
		title: _upperFirst(config.title),
		url: `https://travis-ci.org/${ user.github.slug }`
	}, [node('image', {
		alt: _upperFirst(config.title),
		url: `https://img.shields.io/travis/${ user.github.slug }.svg?branch=${ config.branch }&style=${ config.style }`
	})]);
}

const services = {
	status: render$1,
	aux1: render$2,
	aux2: render$3,
	gitter: render$4,
	'code-climate': cc,
	'code-climate-coverage': ccCoverage,
	david,
	'david-dev': davidDev,
	inch: render$5,
	npm: render$6,
	rollup: render$7,
	snyk: render$8,
	travis: render$9
};

function parseQueue(collection, providers, user) {
	if (Array.isArray(collection)) {
		const badges = _flatten(collection.map(content => [parseQueue(content, providers, user), node('text', ' ')]));
		badges.push(node('break'));
		return node('paragraph', badges);
	}
	if (_isObject(collection)) {
		return _map(collection, (content, title) => {
			return node('root', [node('heading', {
				depth: 5
			}, [node('text', title)]), parseQueue(content, providers, user)]);
		});
	}
	if (!services[collection]) {
		throw new Error(`${ collection } not found`);
	}
	return services[collection](providers[collection], user);
}

function render(context, asAST = false) {
	return Promise.all([pkgConf('badges'), readPkg()]).then(configArray => {
		const config = configArray[0];
		const pkg = configArray[1].pkg;
		if (!config.name || !config.github || !config.npm) {
			throw new Error('Badges requires at least a package name, github repo and npm user account.');
		}
		if (!config[context]) {
			throw new Error(`${ context } is not provided in package.json.`);
		}
		if (!config.providers) {
			throw new Error('At least one badge provider must be specified.');
		}

		return {
			user: {
				name: config.name,
				fullName: pkg.name,
				scoped: /^@.+?\//.test(pkg.name),
				github: {
					user: config.github,
					slug: `${ config.github }/${ config.name }`
				},
				npm: {
					user: config.npm
				}
			},
			providers: _forIn(_defaultsDeep(config.providers, {
				'status': {
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
				'gitter': {
					title: 'gitter',
					room: 'help'
				},
				'code-climate': {
					title: 'code-climate'
				},
				'code-climate-coverage': {
					title: 'coverage'
				},
				'david': {
					title: 'david',
					branch: 'master'
				},
				'david-dev': {
					title: 'david-developer',
					branch: 'master'
				},
				'inch': {
					title: 'inch',
					branch: 'master',
					style: 'shields'
				},
				'npm': {
					title: 'npm',
					icon: true
				},
				'rollup': {
					title: 'rollup',
					icon: true
				},
				'snyk': {
					title: 'snyk'
				},
				'travis': {
					title: 'travis',
					branch: 'master'
				}
			}), value => _defaultsDeep(value, {
				style: config.style || 'flat',
				icon: false
			})),
			queue: config[context]
		};
	}).then(config => {
		return node('root', parseQueue(config.queue, config.providers, config.user));
	}).then(md => {
		if (asAST) {
			return md;
		}
		return remark().use(squeeze).stringify(md);
	});
}

export default render;
