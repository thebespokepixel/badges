import node from 'unist-builder'

// [npm-badge]: https://img.shields.io/npm/v/@thebespokepixel/documentation-theme-bespoke.svg?style=flat&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU%2BbnBtPC90aXRsZT48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IGZpbGwtb3BhY2l0eT0iLjMiIGZpbGw9IiMwMDAiIHg9IjIiIHk9IjExIiB3aWR0aD0iMTAiIGhlaWdodD0iMiIgcng9IjEiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMiAyaDEwdjEwSDJ6Ii8%2BPHBhdGggZmlsbD0iI0MxMjEyNyIgZD0iTTMgMTFoNFY1aDJ2NmgyVjNIM3oiLz48L2c%2BPC9zdmc%2B
// [npm]: https://www.npmjs.com/package/@thebespokepixel/meta

export default function render(config, user) {
	return node('link', {
		title: config.title,
		url: `https://www.npmjs.com/package/${
			user.fullName
		}`
	}, [
		node('image', {
			alt: config.title,
			url: `https://img.shields.io/npm/v/${
				user.fullName
			}.svg?style=${
				config.style
			}&logo=npm`
		})
	])
}
