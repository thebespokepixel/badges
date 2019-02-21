import _upperFirst from 'lodash/upperFirst';
import node from 'unist-builder';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import urlencode from 'urlencode';
import _defaultsDeep from 'lodash/defaultsDeep';
import _forIn from 'lodash/forIn';
import _map from 'lodash/map';
import _isObject from 'lodash/isObject';
import _flatten from 'lodash/flatten';
import pkgConf from 'pkg-conf';
import readPkg from 'read-pkg-up';
import remark from 'remark';
import gap from 'remark-heading-gap';
import squeeze from 'remark-squeeze-paragraphs';

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
    url: `https://img.shields.io/badge/${config.title}-${config.text}-${config.color}.svg?style=${config.style}`
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
    url: `https://img.shields.io/badge/${config.title}-${config.text}-${config.color}.svg?style=${config.style}`
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
    url: `https://codeclimate.com/github/${user.github.slug}/maintainability`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://api.codeclimate.com/v1/badges/${user.codeclimateToken}/maintainability?style=${config.style}`
  })]);
}
function ccCoverage(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://codeclimate.com/github/${user.github.slug}/test_coverage`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://api.codeclimate.com/v1/badges/${user.codeclimateToken}/test_coverage?style=${config.style}`
  })]);
}

function david(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://david-dm.org/${user.github.slug}/${config.branch}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/david/${user.github.slug}.svg?branch=${config.branch}&style=${config.style}`
  })]);
}
function davidDev(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://david-dm.org/${user.github.slug}/${config.branch}#info=devDependencies`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/david/dev/${user.github.slug}.svg?branch=${config.branch}&style=${config.style}`
  })]);
}

function render$3(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://gitter.im/${user.github.user}/${config.room}?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/gitter/room/${user.github.user}/${config.room}.svg?style=${config.style}`
  })]);
}

function render$4(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://inch-ci.org/github/${user.github.slug}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://inch-ci.org/github/${user.github.slug}.svg?branch=${config.branch}&style=${config.style}`
  })]);
}

function render$5(config, user) {
  return node('link', {
    title: config.title,
    url: `https://www.npmjs.com/package/${user.fullName}`
  }, [node('image', {
    alt: config.title,
    url: `https://img.shields.io/npm/v/${user.fullName}.svg?style=${config.style}&logo=npm`
  })]);
}

function renderIcon(file, type) {
  const iconSource = readFileSync(resolve(__dirname, file));
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
    url: `https://img.shields.io/badge/es6-${urlencode('module:mjs_✔')}-64CA39.svg?style=${config.style}${config.icon && renderIconSVG('rollup')}`
  })]);
}

function render$7(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://snyk.io/test/github/${user.github.slug}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/snyk/vulnerabilities/github/${user.github.slug}.svg?style=${config.style}&logo=npm`
  })]);
}

function render$8(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: 'https://greenkeeper.io/'
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://badges.greenkeeper.io/${user.github.slug}.svg`
  })]);
}

function render$9(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: 'https://greenkeeper.io/'
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://badges.greenkeeper.io/${user.github.slug}.svg?token=${user.greenkeeperToken}`
  })]);
}

function render$a(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://travis-ci.org/${user.github.slug}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://img.shields.io/travis/${user.github.slug}.svg?branch=${config.branch}&style=${config.style}&logo=travis`
  })]);
}

function render$b(config, user) {
  return node('link', {
    title: _upperFirst(config.title),
    url: `https://travis-ci.com/${user.github.slug}`
  }, [node('image', {
    alt: _upperFirst(config.title),
    url: `https://api.travis-ci.com/${user.github.slug}.svg?branch=${config.branch}&token=${user.travisToken}`
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
  'david-dev': davidDev,
  inch: render$4,
  npm: render$5,
  rollup: render$6,
  snyk: render$7,
  greenkeeper: render$8,
  'greenkeeper-pro': render$9,
  travis: render$a,
  'travis-pro': render$b
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

async function render$c(context, asAST = false) {
  const configArray = await Promise.all([pkgConf('badges'), readPkg()]);
  const config = configArray[0];
  const {
    pkg
  } = configArray[1];

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
      codeclimateToken: config.codeclimate,
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
      'david-dev': {
        title: 'david-developer',
        branch: 'master'
      },
      inch: {
        title: 'inch',
        branch: 'master',
        style: 'shields'
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
      'travis-pro': {
        title: 'travis',
        branch: 'master'
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

export default render$c;
