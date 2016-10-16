import test from 'ava'
import badges from '..'

test(`Simple status`, async t => {
	const content = await badges('test-1')
	t.is(content, '![Status](http://img.shields.io/badge/status-beta-blue.svg?style=flat) \n\n  \n\n')
})

