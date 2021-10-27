import test from 'ava'
import badges from '../index.js'

test('Simple status', async t => {
	const content = await badges('test-1')
	t.is(content, '![Status](https://img.shields.io/badge/status-production-green)  &#x20;\n')
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
				type: 'text',
				value: '  \n'
			}
		]
	}
	t.deepEqual(content, expected)
})

test('Missing config', async t => {
	await t.throwsAsync(() => badges('test-2', true))
})

test('Readme output', async t => {
	const content = await badges('readme', true)
	// console.dir(content, {depth: 10})
	const expected = {
		type: 'root',
		children: [
			{
				type: 'root',
				children: [
					{
						type: 'heading',
						depth: 5,
						children: [ { type: 'text', value: 'Publishing Status' } ]
					},
					{
						type: 'paragraph',
						children: [
							{
								type: 'paragraph',
								children: [
									{
										type: 'image',
										alt: 'Status',
										url: 'https://img.shields.io/badge/status-production-green'
									},
									{ type: 'text', value: ' ' },
									{
										type: 'link',
										title: 'npm',
										url: 'https://www.npmjs.com/package/@thebespokepixel/badges',
										children: [
											{
												type: 'image',
												alt: 'npm',
												url: 'https://img.shields.io/npm/v/@thebespokepixel/badges?logo=npm'
											}
										]
									},
									{ type: 'text', value: ' ' },
									{
										type: 'link',
										title: 'libraries-io',
										url: 'https://libraries.io/github/thebespokepixel/badges',
										children: [
											{
												type: 'image',
												alt: 'libraries-io',
												url: 'https://img.shields.io/librariesio/release/npm/@thebespokepixel/badges/latest?&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01Ljk5OTMxNDIyLDE1LjI3NyBMNiwyMyBDNiwyMy41NTIyODQ3IDUuNTUyMjg0NzUsMjQgNSwyNCBMMiwyNCBDMS40NDc3MTUyNSwyNCAxLDIzLjU1MjI4NDcgMSwyMyBMMC45OTkzMTQyMjIsMTkuMTg0IEw1Ljk5OTMxNDIyLDE1LjI3NyBaIE0xNC40OTkzMTQyLDguNjM2IEwxNC41LDIzIEMxNC41LDIzLjU1MjI4NDcgMTQuMDUyMjg0NywyNCAxMy41LDI0IEwxMC41LDI0IEM5Ljk0NzcxNTI1LDI0IDkuNSwyMy41NTIyODQ3IDkuNSwyMyBMOS40OTkzMTQyMiwxMi41NDMgTDE0LjQ5OTMxNDIsOC42MzYgWiBNMTcuOTk5MzE0Miw4LjMzNCBMMjIuOTk5MzE0MiwxMi4xMDIgTDIzLDIzIEMyMywyMy41NTIyODQ3IDIyLjU1MjI4NDcsMjQgMjIsMjQgTDE5LDI0IEMxOC40NDc3MTUzLDI0IDE4LDIzLjU1MjI4NDcgMTgsMjMgTDE3Ljk5OTMxNDIsOC4zMzQgWiBNNSwwIEM1LjU1MjI4NDc1LDAgNiwwLjQ0NzcxNTI1IDYsMSBMNS45OTkzMTQyMiwxMS40NzEgTDAuOTk5MzE0MjIyLDE1LjM3OCBMMSwxIEMxLDAuNDQ3NzE1MjUgMS40NDc3MTUyNSwwIDIsMCBMNSwwIFogTTEzLjUsMCBDMTQuMDUyMjg0NywwIDE0LjUsMC40NDc3MTUyNSAxNC41LDEgTDE0LjQ5OTMxNDIsNC44MzEgTDkuNDk5MzE0MjIsOC43MzcgTDkuNSwxIEM5LjUsMC40NDc3MTUyNSA5Ljk0NzcxNTI1LDAgMTAuNSwwIEwxMy41LDAgWiBNMjIsMCBDMjIuNTUyMjg0NywwIDIzLDAuNDQ3NzE1MjUgMjMsMSBMMjIuOTk5MzE0Miw4LjM0NyBMMTcuOTk5MzE0Miw0LjU3OSBMMTgsMSBDMTgsMC40NDc3MTUyNSAxOC40NDc3MTUzLDAgMTksMCBMMjIsMCBaIi8%2BCjwvc3ZnPgo%3D'
											}
										]
									},
									{ type: 'text', value: ' ' },
									{ type: 'text', value: '  \n' }
								]
							},
							{ type: 'text', value: ' ' },
							{
								type: 'paragraph',
								children: [
									{
										type: 'link',
										title: 'Travis',
										url: 'https://travis-ci.com/thebespokepixel/badges',
										children: [
											{
												type: 'image',
												alt: 'Travis',
												url: 'https://img.shields.io/travis/com/thebespokepixel/badges/master?logo=travis'
											}
										]
									},
									{ type: 'text', value: ' ' },
									{
										type: 'link',
										title: 'Rollup',
										url: 'https://github.com/rollup/rollup/wiki/pkg.module',
										children: [
											{
												type: 'image',
												alt: 'Rollup',
												url: 'https://img.shields.io/badge/es6-type%3A%20module%3A%20%E2%9C%94-64CA39?&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHBhdGggZmlsbD0iI0ZGMzMzMyIgZD0iTTEwLjkwNDI4MjQsMy4wMDkxMDY4MyBDMTEuMjM4NzA1NSwzLjU4MjgzNzEzIDExLjQyODU3MTQsNC4yNDQ4MzM2MyAxMS40Mjg1NzE0LDQuOTUwOTYzMjIgQzExLjQyODU3MTQsNi40MTc4NjM0IDEwLjYwODY5NTcsNy42OTU2MjE3MiA5LjM5MTgyNzM5LDguMzc2NTMyNCBDOS4zMDU1MjQ2OCw4LjQyNDg2ODY1IDkuMjczMTYxMTYsOC41MzIwNDkwNCA5LjMxODQ3MDA5LDguNjE4MjEzNjYgTDExLjQyODU3MTQsMTMgTDUuMjU4NjgyODEsMTMgTDIuMzM5Nzc3MjMsMTMgQzIuMTUyMTIzNDUsMTMgMiwxMi44NDgyNzU3IDIsMTIuNjUzODA0OCBMMiwxLjM0NjE5NTIyIEMyLDEuMTU0OTk2ODggMi4xNDgzMTU0MywxIDIuMzM5Nzc3MjMsMSBMNy42NjAyMjI3NywxIEM3LjcwMTU0MTQ5LDEgNy43NDExMzc2NCwxLjAwNzM1NTg4IDcuNzc3NzY2NTgsMS4wMjA5MDQyOSBDOS4wNjQ1MzgyOCwxLjE0NDU0MDA0IDEwLjE3MzM4ODQsMS44NTM4NTI5MSAxMC44MjIyOTQ5LDIuODcyNTA0MzggQzEwLjc5OTE5NTMsMi44NDQ4NDgwNiAxMC44NDQ0OTkxLDIuOTQ5MTc0NzYgMTAuOTA0MjgyNCwzLjAwOTEwNjgzIFoiLz4KICAgIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iLjMxIiBkPSJNOC44NTcxNDI4NiwzLjU3MTQyODU3IEw2LjcxNDI4NTcxLDYuNTcxNDI4NTcgTDkuMjg1NzE0MjksNS4yODU3MTQyOSBDOS4yODU3MTQyOSw1LjI4NTcxNDI5IDkuNzE0Mjg1NzEsNC44NTcxNDI4NiA5LjI4NTcxNDI5LDQuNDI4NTcxNDMgQzkuMjg1NzE0MjksNCA4Ljg1NzE0Mjg2LDMuNTcxNDI4NTcgOC44NTcxNDI4NiwzLjU3MTQyODU3IFoiLz4KICAgIDxwYXRoIGZpbGw9IiNGQkIwNDAiIGQ9Ik0yLjg0Njc0NjAzLDEyLjk5NTg0OTUgQzMuMjY0OTIwNjIsMTIuOTk1ODQ5NSAzLjE4NTkzMDM0LDEyLjk0NjM2NjkgMy4zMTYxMTYzOCwxMi44NzM5MDU0IEMzLjYxODE3NTg3LDEyLjcwNTc3OTMgNS42ODk0NDA5OSw4LjcxMjc4NDU5IDcuNzE3NTU0NzYsNi44MjEzNjYwMiBDOS43NDU2Njg1Miw0LjkyOTk0NzQ2IDEwLjAwNDU3NjcsNS41NjA0MjAzMiA4Ljg4NDc5ODk1LDMuNTAyOTc3MjMgQzguODg0Nzk4OTUsMy41MDI5NzcyMyA5Ljc0NzgyNjA5LDUuMTQyMjA2NjUgOS4wMTQyNTMwMiw1LjI2ODMwMTIzIEM4LjQzODE4MjQxLDUuMzY3MDc1MzEgNy4xMTk5MDg0Nyw0LjEyMjk0MjIxIDcuNjExODMzOTMsMy4wMDQ5MDM2OCBDOC4wOTA4MTM5OSwxLjkxNDE4NTY0IDEwLjAxOTY3OTYsMi4xMjAxNDAxMSAxMC45MDY0NCwzLjAwOTEwNjgzIEMxMC44NzgzOTE2LDIuOTYyODcyMTUgMTAuODUwMzQzMiwyLjkxNjYzNzQ4IDEwLjgyMjI5NDksMi44NzI1MDQzOCBDMTAuMzA0NDc4NiwyLjI1MjUzOTQgOS41MDQwMjA5MiwxLjkwMzY3Nzc2IDguNzEwMDM1OTYsMS45MDM2Nzc3NiBDNy4xOTk3Mzg0OCwxLjkwMzY3Nzc2IDYuODIwMDA2NTQsMi40MjY5NzAyMyAzLjkyMDIzNTM3LDcuNjE5OTY0OTcgQzIuMzg3Nzk5MzQsMTAuMzY1NDA2NyAyLjAxMDgzMTkzLDExLjU3MzUwNzkgMi4wMDYyOTA2OSwxMi4xNjk4MTgyIEMyLDEyLjk5NTg0OTUgMi4wMDYyOTA2OSwxMi45OTU4NDk1IDIuODQ2NzQ2MDMsMTIuOTk1ODQ5NSBaIi8%2BCiAgPC9nPgo8L3N2Zz4K'
											}
										]
									},
									{ type: 'text', value: ' ' },
									{ type: 'text', value: '  \n' }
								]
							},
							{ type: 'text', value: ' ' },
							{ type: 'text', value: '  \n' }
						]
					}
				]
			},
			{
				type: 'root',
				children: [
					{
						type: 'heading',
						depth: 5,
						children: [ { type: 'text', value: 'Development Status' } ]
					},
					{
						type: 'paragraph',
						children: [
							{
								type: 'paragraph',
								children: [
									{
										type: 'link',
										title: 'Travis',
										url: 'https://travis-ci.com/thebespokepixel/badges',
										children: [
											{
												type: 'image',
												alt: 'Travis',
												url: 'https://img.shields.io/travis/com/thebespokepixel/badges/develop?logo=travis'
											}
										]
									},
									{ type: 'text', value: ' ' },
									{
										type: 'link',
										title: 'libraries-io',
										url: 'https://libraries.io/github/thebespokepixel/badges',
										children: [
											{
												type: 'image',
												alt: 'libraries-io',
												url: 'https://img.shields.io/librariesio/github/TheBespokePixel/badges?&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01Ljk5OTMxNDIyLDE1LjI3NyBMNiwyMyBDNiwyMy41NTIyODQ3IDUuNTUyMjg0NzUsMjQgNSwyNCBMMiwyNCBDMS40NDc3MTUyNSwyNCAxLDIzLjU1MjI4NDcgMSwyMyBMMC45OTkzMTQyMjIsMTkuMTg0IEw1Ljk5OTMxNDIyLDE1LjI3NyBaIE0xNC40OTkzMTQyLDguNjM2IEwxNC41LDIzIEMxNC41LDIzLjU1MjI4NDcgMTQuMDUyMjg0NywyNCAxMy41LDI0IEwxMC41LDI0IEM5Ljk0NzcxNTI1LDI0IDkuNSwyMy41NTIyODQ3IDkuNSwyMyBMOS40OTkzMTQyMiwxMi41NDMgTDE0LjQ5OTMxNDIsOC42MzYgWiBNMTcuOTk5MzE0Miw4LjMzNCBMMjIuOTk5MzE0MiwxMi4xMDIgTDIzLDIzIEMyMywyMy41NTIyODQ3IDIyLjU1MjI4NDcsMjQgMjIsMjQgTDE5LDI0IEMxOC40NDc3MTUzLDI0IDE4LDIzLjU1MjI4NDcgMTgsMjMgTDE3Ljk5OTMxNDIsOC4zMzQgWiBNNSwwIEM1LjU1MjI4NDc1LDAgNiwwLjQ0NzcxNTI1IDYsMSBMNS45OTkzMTQyMiwxMS40NzEgTDAuOTk5MzE0MjIyLDE1LjM3OCBMMSwxIEMxLDAuNDQ3NzE1MjUgMS40NDc3MTUyNSwwIDIsMCBMNSwwIFogTTEzLjUsMCBDMTQuMDUyMjg0NywwIDE0LjUsMC40NDc3MTUyNSAxNC41LDEgTDE0LjQ5OTMxNDIsNC44MzEgTDkuNDk5MzE0MjIsOC43MzcgTDkuNSwxIEM5LjUsMC40NDc3MTUyNSA5Ljk0NzcxNTI1LDAgMTAuNSwwIEwxMy41LDAgWiBNMjIsMCBDMjIuNTUyMjg0NywwIDIzLDAuNDQ3NzE1MjUgMjMsMSBMMjIuOTk5MzE0Miw4LjM0NyBMMTcuOTk5MzE0Miw0LjU3OSBMMTgsMSBDMTgsMC40NDc3MTUyNSAxOC40NDc3MTUzLDAgMTksMCBMMjIsMCBaIi8%2BCjwvc3ZnPgo%3D'
											}
										]
									},
									{ type: 'text', value: ' ' },
									{ type: 'text', value: '  \n' }
								]
							},
							{ type: 'text', value: ' ' },
							{
								type: 'paragraph',
								children: [
									{
										type: 'link',
										title: 'Snyk',
										url: 'https://snyk.io/test/github/thebespokepixel/badges',
										children: [
											{
												type: 'image',
												alt: 'Snyk',
												url: 'https://snyk.io/test/github/thebespokepixel/badges/badge.svg'
											}
										]
									},
									{ type: 'text', value: ' ' },
									{
										type: 'link',
										title: 'Code-climate',
										url: 'https://codeclimate.com/github/thebespokepixel/badges/maintainability',
										children: [
											{
												type: 'image',
												alt: 'Code-climate',
												url: 'https://api.codeclimate.com/v1/badges/07f2fcfc32f33b4acc05/maintainability'
											}
										]
									},
									{ type: 'text', value: ' ' },
									{
										type: 'link',
										title: 'Coverage',
										url: 'https://codeclimate.com/github/thebespokepixel/badges/test_coverage',
										children: [
											{
												type: 'image',
												alt: 'Coverage',
												url: 'https://api.codeclimate.com/v1/badges/07f2fcfc32f33b4acc05/test_coverage'
											}
										]
									},
									{ type: 'text', value: ' ' },
									{ type: 'text', value: '  \n' }
								]
							},
							{ type: 'text', value: ' ' },
							{ type: 'text', value: '  \n' }
						]
					}
				]
			},
			{
				type: 'root',
				children: [
					{
						type: 'heading',
						depth: 5,
						children: [ { type: 'text', value: 'Documentation/Help' } ]
					},
					{
						type: 'paragraph',
						children: [
							{
								type: 'link',
								title: 'Twitter',
								url: 'https://twitter.com/thebespokepixel',
								children: [
									{
										type: 'image',
										alt: 'Twitter',
										url: 'https://img.shields.io/twitter/follow/thebespokepixel?style=social'
									}
								]
							},
							{ type: 'text', value: ' ' },
							{ type: 'text', value: '  \n' }
						]
					}
				]
			}
		]
	}

	t.deepEqual(content, expected)
})
