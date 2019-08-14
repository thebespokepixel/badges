import _ from 'lodash'
import node from 'unist-builder'

export function david(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://david-dm.org/${
			user.github.slug
		}/${
			config.branch === 'dev' ? user.devBranch : config.branch
		}`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://david-dm.org/${
				user.github.slug
			}/${
				config.branch === 'dev' ? user.devBranch : config.branch
			}/status.svg`
		})
	])
}

export function davidDevDeps(config, user) {
	return node('link', {
		title: _.upperFirst(config.title),
		url: `https://david-dm.org/${
			user.github.slug
		}/${
			config.branch === 'dev' ? user.devBranch : config.branch
		}?type=dev`
	}, [
		node('image', {
			alt: _.upperFirst(config.title),
			url: `https://david-dm.org/${
				user.github.slug
			}/${
				config.branch === 'dev' ? user.devBranch : config.branch
			}/dev-status.svg`
		})
	])
}
