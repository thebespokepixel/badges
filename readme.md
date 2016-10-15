# @thebespokepixel/badges

> Automatically render project badges into readme and documentation files.

##### Status

![Status](http://img.shields.io/badge/status-beta-blue.svg?style=flat) [![npm](https://img.shields.io/npm/v/@thebespokepixel/badges.svg?style=flat&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU%2BbnBtPC90aXRsZT48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IGZpbGwtb3BhY2l0eT0iLjMiIGZpbGw9IiMwMDAiIHg9IjIiIHk9IjExIiB3aWR0aD0iMTAiIGhlaWdodD0iMiIgcng9IjEiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMiAyaDEwdjEwSDJ6Ii8%2BPHBhdGggZmlsbD0iI0MxMjEyNyIgZD0iTTMgMTFoNFY1aDJ2NmgyVjNIM3oiLz48L2c%2BPC9zdmc%2B)](https://www.npmjs.com/package/@thebespokepixel/badges "npm") [![Travis](https://img.shields.io/travis/MarkGriffiths/badges.svg?branch=master&style=flat)](https://travis-ci.org/MarkGriffiths/badges "Travis") [![David](https://img.shields.io/david/MarkGriffiths/badges.svg?branch=master&style=flat)](https://david-dm.org/MarkGriffiths/badges/master "David")  
[![Code-climate](https://codeclimate.com/github/MarkGriffiths/badges/badges/gpa.svg?style=flat)](https://codeclimate.com/github/MarkGriffiths/badges "Code-climate") [![Coverage](https://codeclimate.com/github/MarkGriffiths/badges/badges/coverage.svg?style=flat)](https://codeclimate.com/coverage/github/MarkGriffiths/badges "Coverage") [![Snyk](https://snyk.io/test/github/MarkGriffiths/badges/badge.svg?style=flat)](https://snyk.io/test/github/MarkGriffiths/badges "Snyk")   

##### Developer

[![David-developer](https://img.shields.io/david/dev/MarkGriffiths/badges.svg?branch=master&style=flat)](https://david-dm.org/MarkGriffiths/badges/master#info=devDependencies "David-developer") [![Rollup](https://img.shields.io/badge/es2015-jsnext%3Amain_%E2%9C%94-64CA39.svg?style=flat&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMSIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDExIDE0Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHBhdGggZmlsbD0iI0ZGMzMzMyIgZD0iTTEwLjM4ODMyOTUsMi4zNDM5NTc5NyBDMTAuNzc4NDg5NywzLjAxMzMwOTk4IDExLDMuNzg1NjM5MjMgMTEsNC42MDk0NTcwOSBDMTEsNi4zMjA4NDA2MyAxMC4wNDM0NzgzLDcuODExNTU4NjcgOC42MjM3OTg2Myw4LjYwNTk1NDQ3IEM4LjUyMzExMjEzLDguNjYyMzQ2NzYgOC40ODUzNTQ2OSw4Ljc4NzM5MDU0IDguNTM4MjE1MSw4Ljg4NzkxNTk0IEwxMSwxNCBMMy44MDE3OTY2MiwxNCBMMC4zOTY0MDY3NywxNCBDMC4xNzc0NzczNTYsMTQgMCwxMy44MjI5ODgzIDAsMTMuNTk2MTA1NiBMMCwwLjQwMzg5NDQyNCBDMCwwLjE4MDgyOTY5MyAwLjE3MzAzNDY2OCwwIDAuMzk2NDA2NzcsMCBMNi42MDM1OTMyMywwIEM2LjY1MTc5ODQxLDAgNi42OTc5OTM5MSwwLjAwODU4MTg1NDk5IDYuNzQwNzI3NjcsMC4wMjQzODgzMzQ4IEM4LjI0MTk2MTMyLDAuMTY4NjMwMDUyIDkuNTM1NjE5ODUsMC45OTYxNjE3MzQgMTAuMjkyNjc3MywyLjE4NDU4ODQ0IEMxMC4yNjU3Mjc5LDIuMTUyMzIyNzMgMTAuMzE4NTgyMywyLjI3NDAzNzIyIDEwLjM4ODMyOTUsMi4zNDM5NTc5NyBaIi8%2BCiAgICA8cGF0aCBmaWxsPSIjRkJCMDQwIiBkPSJNMC45ODc4NzAzNjMsMTMuOTk1MTU3OCBDMS40NzU3NDA3MywxMy45OTUxNTc4IDEuMzgzNTg1MzksMTMuOTM3NDI4IDEuNTM1NDY5MTEsMTMuODUyODg5NyBDMS44ODc4NzE4NSwxMy42NTY3NDI2IDQuMzA0MzQ3ODMsOC45OTgyNDg2OSA2LjY3MDQ4MDU1LDYuNzkxNTkzNyBDOS4wMzY2MTMyNyw0LjU4NDkzODcgOS4zMzg2NzI3Nyw1LjMyMDQ5MDM3IDguMDMyMjY1NDUsMi45MjAxNDAxMSBDOC4wMzIyNjU0NSwyLjkyMDE0MDExIDkuMDM5MTMwNDMsNC44MzI1NzQ0MyA4LjE4MzI5NTE5LDQuOTc5Njg0NzYgQzcuNTExMjEyODEsNS4wOTQ5MjExOSA1Ljk3MzIyNjU0LDMuNjQzNDMyNTcgNi41NDcxMzk1OSwyLjMzOTA1NDI5IEM3LjEwNTk0OTY2LDEuMDY2NTQ5OTEgOS4zNTYyOTI5MSwxLjMwNjgzMDEyIDEwLjM5MDg0NjcsMi4zNDM5NTc5NyBDMTAuMzU4MTIzNiwyLjI5MDAxNzUxIDEwLjMyNTQwMDUsMi4yMzYwNzcwNiAxMC4yOTI2NzczLDIuMTg0NTg4NDQgQzkuNjg4NTU4MzUsMS40NjEyOTU5NyA4Ljc1NDY5MTA4LDEuMDU0MjkwNzIgNy44MjgzNzUyOSwxLjA1NDI5MDcyIEM2LjA2NjM2MTU2LDEuMDU0MjkwNzIgNS42MjMzNDA5NiwxLjY2NDc5ODYgMi4yNDAyNzQ2LDcuNzIzMjkyNDcgQzAuNDUyNDMyNTY3LDEwLjkyNjMwNzggMC4wMTI2MzcyNDk5LDEyLjMzNTc1OTIgMC4wMDczMzkxNDAyNSwxMy4wMzE0NTQ1IEMtMS40OTUzMzE2NGUtMTUsMTMuOTk1MTU3OCAwLjAwNzMzOTE0MDI1LDEzLjk5NTE1NzggMC45ODc4NzAzNjMsMTMuOTk1MTU3OCBaIi8%2BCiAgPC9nPgo8L3N2Zz4K)](https://github.com/rollup/rollup/wiki/jsnext:main "Rollup")   

##### Help

[![Inch](https://inch-ci.org/github/MarkGriffiths/badges.svg?branch=master&style=shields)](https://inch-ci.org/github/MarkGriffiths/badges "Inch") [![Gitter](https://img.shields.io/gitter/room/MarkGriffiths/help.svg?style=flat)](https://gitter.im/MarkGriffiths/help?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge "Gitter")   

## Usage

#### Installation

```sh
npm install --save @thebespokepixel/badges
```

#### Setup

Require (or import) the module…

```javascript
const badges = require('@thebespokepixel/badges')
```

…then do something with it.

```javascript
function renderBadges() {
	badges('readme').then(markdown => {
		/* Include or output markdown... */
		console.log(markdown)
	})
}
```

## Documentation

Full documentation can be found at [https://markgriffiths.github.io/badges/][1]

[1]: https://markgriffiths.github.io/badges/
