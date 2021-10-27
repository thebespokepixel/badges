import test from 'ava'
import badges from '../index.js'

test('Simple status', async t => {
	const content = await badges('test-1')
	t.is(content, '![Status](https://img.shields.io/badge/status-production-green) \\\n')
})

test('Simple status as AST', async t => {
	const content = await badges('test-1', true)
	const expected = {
		type: 'paragraph',
		children: [
			{
				alt: 'Status',
				url: 'https://img.shields.io/badge/status-production-green',
				type: 'image'
			},
			{
				type: 'text',
				value: ' '
			},
			{
				type: 'break'
			}
		]
	}
	t.deepEqual(content, expected)
})
