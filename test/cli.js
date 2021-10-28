import {promisify} from 'node:util'
import {exec} from 'node:child_process'
import test from 'ava'

const execPromise = promisify(exec)

test('Test CLI Compiler version', async t => {
	const {stdout} = await execPromise('./bin/compile-readme.js -vv')
	t.snapshot(stdout)
})

test('Test CLI Compiler basic', async t => {
	const {stdout} = await execPromise('./bin/compile-readme.js ./test/fixtures/in/readme-basic.md')
	t.snapshot(stdout)
})

test('Test CLI Compiler usage', async t => {
	const {stdout} = await execPromise('./bin/compile-readme.js -u ./test/fixtures/in/example.md ./test/fixtures/in/readme-usage.md')
	t.snapshot(stdout)
})
