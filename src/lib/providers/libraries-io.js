import {u} from 'unist-builder'
import {renderIconSVG} from '../utils.js'

export function libsRelease(config, user) {
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

export function libsRepo(config, user) {
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
