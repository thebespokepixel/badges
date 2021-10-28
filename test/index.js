import test from 'ava'
import badges from '../index.js'

test('Simple status', async t => {
	const content = await badges('test-1')
	t.is(content, '![Status](https://img.shields.io/badge/status-production-green "Status")&#x20;\\\n')
})

test('Simple status as Markdown', async t => {
	const content = await badges('test-1')
	t.snapshot(content)
})

test('Missing config', async t => {
	await t.throwsAsync(() => badges('test-2', true))
})

test('Readme output as AST', async t => {
	const content = await badges('readme', true)
	t.snapshot(content)
})
