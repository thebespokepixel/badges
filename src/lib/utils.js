/* eslint node/prefer-global/buffer: [error] */

import {readFileSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import urlencode from 'urlencode'

function renderIcon(file, type) {
	const iconSource = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), file))
	const iconBuffer = Buffer.from(iconSource)

	return `&logo=${urlencode(`data:${type};base64,${iconBuffer.toString('base64')}`)}`
}

export const renderIconSVG = id => renderIcon(`../icons/${id}.svg`, 'image/svg+xml')
export const renderIconPNG = id => renderIcon(`../icons/${id}.png`, 'image/png')
