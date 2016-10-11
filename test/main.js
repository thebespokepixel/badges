import test from 'ava'

import badges from '..'

test(`Module name is '${pkg.name}'.`, t => {
	t.is(`${pkg.name}`, myMeta.name)
})

