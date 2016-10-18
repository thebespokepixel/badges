import {readFileSync} from 'fs'
import urlencode from 'urlencode'
import {gte} from 'semver'

export function renderIconSVG(id) {
	const iconSource = readFileSync(`./icons/${id}.svg`)
	const iconBuffer = gte(process.version, '6.0.0') ?
		Buffer.from(iconSource) :
		new Buffer(iconSource)

	return `&logo=${urlencode(`data:image/svg+xml;base64,${iconBuffer.toString('base64')}`)}`
}

export function renderIconPNG(id) {
	const iconSource = readFileSync(`./icons/${id}.png`)
	const iconBuffer = gte(process.version, '6.0.0') ?
		Buffer.from(iconSource) :
		new Buffer(iconSource)

	return `&logo=${urlencode(`data:image/png;base64,${iconBuffer.toString('base64')}`)}`
}
