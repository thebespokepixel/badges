import {readFileSync} from 'fs'
import {resolve} from 'path'
import urlencode from 'urlencode'

function renderIcon(file, type) {
	const iconSource = readFileSync(resolve(__dirname, file))
	const iconBuffer = Buffer.from(iconSource)

	return `&logo=${urlencode(`data:${type};base64,${iconBuffer.toString('base64')}`)}`
}

export const renderIconSVG = id => renderIcon(`../icons/${id}.svg`, 'image/svg+xml')
export const renderIconPNG = id => renderIcon(`../icons/${id}.png`, 'image/png')
