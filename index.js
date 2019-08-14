'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defaultsDeep = _interopDefault(require('lodash/defaultsDeep'));
var _forIn = _interopDefault(require('lodash/forIn'));
var _map = _interopDefault(require('lodash/map'));
var _isObject = _interopDefault(require('lodash/isObject'));
var _flatten = _interopDefault(require('lodash/flatten'));
var pkgConf = _interopDefault(require('pkg-conf'));
var readPkg = _interopDefault(require('read-pkg-up'));
var remark = _interopDefault(require('remark'));
var node = _interopDefault(require('unist-builder'));
var gap = _interopDefault(require('remark-heading-gap'));
var squeeze = _interopDefault(require('remark-squeeze-paragraphs'));
var _upperFirst = _interopDefault(require('lodash/upperFirst'));
var urlencode = _interopDefault(require('urlencode'));
var fs = require('fs');
var path = require('path');

function render(config) {
  const badgeNode = node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/badge/status-${config.text}-${config.color}.svg?style=${config.style}`
  });

  if (config.link) {
    return node('link', {
      title: _upperFirst(config.title),
      url: config.link
    }, [badgeNode]);
  }

  return badgeNode;
}

function render$1(config) {
  const badgeNode = node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/badge/${config.title}-${config.text}-${config.color}.svg`
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
    url: `https://img.shields.io/badge/${config.title}-${config.text}-${config.color}.svg`
  });

  if (config.link) {
    return node('link', {
      title: _upperFirst(config.title),
      url: config.link
    }, [badgeNode]);
  }

  return badgeNode;
}

function ccPath(user) {
  return user.codeclimateRepoToken ? `repos/${user.codeclimateRepoToken}` : `github/${user.github.slug}`;
}

function cc(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://codeclimate.com/${ccPath(user)}/maintainability`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://api.codeclimate.com/v1/badges/${user.codeclimateToken}/maintainability`
  })]);
}
function ccCoverage(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://codeclimate.com/${ccPath(user)}/test_coverage`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://api.codeclimate.com/v1/badges/${user.codeclimateToken}/test_coverage`
  })]);
}

function david(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://david-dm.org/${user.github.slug}/${config.branch === 'dev' ? user.devBranch : config.branch}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://david-dm.org/${user.github.slug}/${config.branch === 'dev' ? user.devBranch : config.branch}/status.svg`
  })]);
}
function davidDevDeps(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://david-dm.org/${user.github.slug}/${config.branch === 'dev' ? user.devBranch : config.branch}?type=dev`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://david-dm.org/${user.github.slug}/${config.branch === 'dev' ? user.devBranch : config.branch}/status.svg`
  })]);
}

function render$3(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://gitter.im/${user.github.user}/${config.room}?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/gitter/room/${user.github.user}/${config.room}.svg`
  })]);
}

function render$4(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://inch-ci.org/github/${user.github.slug}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://inch-ci.org/github/${user.github.slug}.svg?branch=${config.branch === 'dev' ? user.devBranch : config.branch}&style=shields`
  })]);
}

function render$5(config, user) {
  return node('link', {
    title: config.title,
    url: `https://www.npmjs.com/package/${user.fullName}`
  }, [node('image', {
    alt: config.title,
    url: `https://img.shields.io/npm/v/${user.fullName}.svg?logo=npm`
  })]);
}

function renderIcon(file, type) {
  const iconSource = fs.readFileSync(path.resolve(__dirname, file));
  const iconBuffer = Buffer.from(iconSource);
  return `&logo=${urlencode(`data:${type};base64,${iconBuffer.toString('base64')}`)}`;
}

const renderIconSVG = id => renderIcon(`../icons/${id}.svg`, 'image/svg+xml');

function render$6(config) {
  return node('link', {
    title: _upperFirst(config.title),
    url: 'https://github.com/rollup/rollup/wiki/pkg.module'
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/badge/es6-${urlencode('module:mjs_✔')}-64CA39.svg?${config.icon && renderIconSVG('rollup')}`
  })]);
}

function render$7(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://snyk.io/test/github/${user.github.slug}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://snyk.io/test/github/${user.github.slug}/badge.svg`
  })]);
}

function greenkeeper(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: 'https://greenkeeper.io/'
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://badges.greenkeeper.io/${user.github.slug}.svg`
  })]);
}
function greenkeeperPro(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: 'https://greenkeeper.io/'
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://badges.greenkeeper.io/${user.github.slug}.svg?token=${user.greenkeeperToken}`
  })]);
}

function travis(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://travis-ci.org/${user.github.slug}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/travis/${user.github.slug}/${config.branch === 'dev' ? user.devBranch : config.branch}?style=${config.style}&logo=travis`
  })]);
}
function travisCom(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://travis-ci.com/${user.github.slug}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/travis/com/${user.github.slug}/${config.branch === 'dev' ? user.devBranch : config.branch}?style=${config.style}&logo=travis`
  })]);
}
function travisPro(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://travis-ci.com/${user.github.slug}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://api.travis-ci.com/${user.github.slug}.svg?branch=${config.branch === 'dev' ? user.devBranch : config.branch}&token=${user.travisToken}`
  })]);
}

const services = {
  status: render,
  aux1: render$1,
  aux2: render$2,
  gitter: render$3,
  'code-climate': cc,
  'code-climate-coverage': ccCoverage,
  david,
  'david-dev': david,
  'david-devdeps': davidDevDeps,
  'david-devdeps-dev': davidDevDeps,
  inch: render$4,
  'inch-dev': render$4,
  npm: render$5,
  rollup: render$6,
  snyk: render$7,
  greenkeeper,
  'greenkeeper-pro': greenkeeperPro,
  travis,
  'travis-dev': travis,
  'travis-com': travisCom,
  'travis-com-dev': travisCom,
  'travis-pro': travisPro,
  'travis-pro-dev': travisPro
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
    throw new Error(`${collection} not found`);
  }

  return services[collection](providers[collection], user);
}

async function render$8(context, asAST = false) {
  const configArray = await Promise.all([pkgConf('badges'), readPkg()]);
  const config = configArray[0];
  const pkg = configArray[1].package;

  if (!config.name || !config.github || !config.npm) {
    throw new Error('Badges requires at least a package name, github repo and npm user account.');
  }

  if (!config[context]) {
    throw new Error(`${context} is not provided in package.json.`);
  }

  if (!config.providers) {
    throw new Error('At least one badge provider must be specified.');
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
      devBranch: 'develop',
      codeclimateToken: config.codeclimate,
      codeclimateRepoToken: config['codeclimate-repo'],
      travisToken: config.travis,
      greenkeeperToken: config.greenkeeper
    },
    providers: _forIn(_defaultsDeep(config.providers, {
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
    }), value => _defaultsDeep(value, {
      style: config.style || 'flat',
      icon: false
    })),
    queue: config[context]
  };
  const ast = node('root', parseQueue(badgeQueue.queue, badgeQueue.providers, badgeQueue.user));

  if (asAST) {
    return ast;
  }

  return remark().use(gap).use(squeeze).stringify(ast);
}

module.exports = render$8;
