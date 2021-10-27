# Badges

> Automatically render project badges into readme and documentation files, with consistent styling.

##### Publishing Status

![Status](https://img.shields.io/badge/status-production-green) [![npm](https://img.shields.io/npm/v/@thebespokepixel/badges?logo=npm)](https://www.npmjs.com/package/@thebespokepixel/badges "npm") [![David](https://david-dm.org/thebespokepixel/badges/master/status.svg)](https://david-dm.org/thebespokepixel/badges/master "David")  
 [![Travis](https://img.shields.io/travis/com/thebespokepixel/badges/master?logo=travis)](https://travis-ci.com/thebespokepixel/badges "Travis") [![Rollup](https://img.shields.io/badge/es6-module%3Amjs_%E2%9C%94-64CA39?&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHBhdGggZmlsbD0iI0ZGMzMzMyIgZD0iTTEwLjkwNDI4MjQsMy4wMDkxMDY4MyBDMTEuMjM4NzA1NSwzLjU4MjgzNzEzIDExLjQyODU3MTQsNC4yNDQ4MzM2MyAxMS40Mjg1NzE0LDQuOTUwOTYzMjIgQzExLjQyODU3MTQsNi40MTc4NjM0IDEwLjYwODY5NTcsNy42OTU2MjE3MiA5LjM5MTgyNzM5LDguMzc2NTMyNCBDOS4zMDU1MjQ2OCw4LjQyNDg2ODY1IDkuMjczMTYxMTYsOC41MzIwNDkwNCA5LjMxODQ3MDA5LDguNjE4MjEzNjYgTDExLjQyODU3MTQsMTMgTDUuMjU4NjgyODEsMTMgTDIuMzM5Nzc3MjMsMTMgQzIuMTUyMTIzNDUsMTMgMiwxMi44NDgyNzU3IDIsMTIuNjUzODA0OCBMMiwxLjM0NjE5NTIyIEMyLDEuMTU0OTk2ODggMi4xNDgzMTU0MywxIDIuMzM5Nzc3MjMsMSBMNy42NjAyMjI3NywxIEM3LjcwMTU0MTQ5LDEgNy43NDExMzc2NCwxLjAwNzM1NTg4IDcuNzc3NzY2NTgsMS4wMjA5MDQyOSBDOS4wNjQ1MzgyOCwxLjE0NDU0MDA0IDEwLjE3MzM4ODQsMS44NTM4NTI5MSAxMC44MjIyOTQ5LDIuODcyNTA0MzggQzEwLjc5OTE5NTMsMi44NDQ4NDgwNiAxMC44NDQ0OTkxLDIuOTQ5MTc0NzYgMTAuOTA0MjgyNCwzLjAwOTEwNjgzIFoiLz4KICAgIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iLjMxIiBkPSJNOC44NTcxNDI4NiwzLjU3MTQyODU3IEw2LjcxNDI4NTcxLDYuNTcxNDI4NTcgTDkuMjg1NzE0MjksNS4yODU3MTQyOSBDOS4yODU3MTQyOSw1LjI4NTcxNDI5IDkuNzE0Mjg1NzEsNC44NTcxNDI4NiA5LjI4NTcxNDI5LDQuNDI4NTcxNDMgQzkuMjg1NzE0MjksNCA4Ljg1NzE0Mjg2LDMuNTcxNDI4NTcgOC44NTcxNDI4NiwzLjU3MTQyODU3IFoiLz4KICAgIDxwYXRoIGZpbGw9IiNGQkIwNDAiIGQ9Ik0yLjg0Njc0NjAzLDEyLjk5NTg0OTUgQzMuMjY0OTIwNjIsMTIuOTk1ODQ5NSAzLjE4NTkzMDM0LDEyLjk0NjM2NjkgMy4zMTYxMTYzOCwxMi44NzM5MDU0IEMzLjYxODE3NTg3LDEyLjcwNTc3OTMgNS42ODk0NDA5OSw4LjcxMjc4NDU5IDcuNzE3NTU0NzYsNi44MjEzNjYwMiBDOS43NDU2Njg1Miw0LjkyOTk0NzQ2IDEwLjAwNDU3NjcsNS41NjA0MjAzMiA4Ljg4NDc5ODk1LDMuNTAyOTc3MjMgQzguODg0Nzk4OTUsMy41MDI5NzcyMyA5Ljc0NzgyNjA5LDUuMTQyMjA2NjUgOS4wMTQyNTMwMiw1LjI2ODMwMTIzIEM4LjQzODE4MjQxLDUuMzY3MDc1MzEgNy4xMTk5MDg0Nyw0LjEyMjk0MjIxIDcuNjExODMzOTMsMy4wMDQ5MDM2OCBDOC4wOTA4MTM5OSwxLjkxNDE4NTY0IDEwLjAxOTY3OTYsMi4xMjAxNDAxMSAxMC45MDY0NCwzLjAwOTEwNjgzIEMxMC44NzgzOTE2LDIuOTYyODcyMTUgMTAuODUwMzQzMiwyLjkxNjYzNzQ4IDEwLjgyMjI5NDksMi44NzI1MDQzOCBDMTAuMzA0NDc4NiwyLjI1MjUzOTQgOS41MDQwMjA5MiwxLjkwMzY3Nzc2IDguNzEwMDM1OTYsMS45MDM2Nzc3NiBDNy4xOTk3Mzg0OCwxLjkwMzY3Nzc2IDYuODIwMDA2NTQsMi40MjY5NzAyMyAzLjkyMDIzNTM3LDcuNjE5OTY0OTcgQzIuMzg3Nzk5MzQsMTAuMzY1NDA2NyAyLjAxMDgzMTkzLDExLjU3MzUwNzkgMi4wMDYyOTA2OSwxMi4xNjk4MTgyIEMyLDEyLjk5NTg0OTUgMi4wMDYyOTA2OSwxMi45OTU4NDk1IDIuODQ2NzQ2MDMsMTIuOTk1ODQ5NSBaIi8%2BCiAgPC9nPgo8L3N2Zz4K)](https://github.com/rollup/rollup/wiki/pkg.module "Rollup")   

##### Development Status

[![Travis](https://img.shields.io/travis/com/thebespokepixel/badges/develop?logo=travis)](https://travis-ci.com/thebespokepixel/badges "Travis") [![David](https://david-dm.org/thebespokepixel/badges/develop/status.svg)](https://david-dm.org/thebespokepixel/badges/develop "David") [![David-developer](https://david-dm.org/thebespokepixel/badges/develop/dev-status.svg)](https://david-dm.org/thebespokepixel/badges/develop?type=dev "David-developer")  
 [![Snyk](https://snyk.io/test/github/thebespokepixel/badges/badge.svg)](https://snyk.io/test/github/thebespokepixel/badges "Snyk") [![Code-climate](https://api.codeclimate.com/v1/badges/07f2fcfc32f33b4acc05/maintainability)](https://codeclimate.com/github/thebespokepixel/badges/maintainability "Code-climate") [![Coverage](https://api.codeclimate.com/v1/badges/07f2fcfc32f33b4acc05/test\_coverage)](https://codeclimate.com/github/thebespokepixel/badges/test\_coverage "Coverage")   

##### Documentation/Help

[![Inch](https://inch-ci.org/github/thebespokepixel/badges.svg?branch=master&style=shields)](https://inch-ci.org/github/thebespokepixel/badges "Inch") [![Twitter](https://img.shields.io/twitter/follow/thebespokepixel?style=social)](https://twitter.com/thebespokepixel "Twitter")   

There's a wealth of status badges available out there, but even using a service like <https://shields.io> still doesn't cover everything and what it covers can be missing functionality… 

…how about handling differences in your published and development branches?

…and, of course, you want it all looking organised and consistent, as much as possible…

Doing it properly means too much faffing about, despite it being useful to have 'at-a-glance' status reporting. This module is my attempt to cover off all that badge work into something I can simply include in `package.json` and move on.

If there are badges you'd like to see included, add an issue above, or better still a PR and I'll add it. 


## Usage

#### Installation

```shell
npm install --save @thebespokepixel/badges
```

#### Example

With this source.markdown:

```markdown
  Badges:
  ${badges}
```

Read it in as a template and merge the AST:

```js
/* Import the module… */
import {readFileSync} from 'fs'
import _ from 'lodash'
import remark from 'remark'
import badges from 'badges'

/* …then read the 'badges.readme' stanza from package.json and send the AST into remark etc. */
const content = {
  badges: await badges('readme')
}

const template = _.template(readFileSync('./source.markdown'))
const page = await remark().process(template(content))
```


## Supported badges

-   Status (plus similar aux1 and aux2)
-   Travis (.org and .com)
-   Travis private repos (requires a `travis` private repo token)
-   David and David development dependencies
-   Code Climate and Code Climate Coverage (requires a `codeclimate` repo token)
-   Inch CI
-   npm
-   Rollup
-   Snyk
-   Gitter
-   Twitter


## Configuration

In `package.json`...

    ...
    "badges": {
      "name": "badges", // Package name
      "github": "thebespokepixel", // github user
      "npm": "thebespokepixel", // npm user
      "twitter": "thebespokepixel", // twitter user (optional, defaults to github user name)
      "devBranch": "develop", // Development branch name (optional, defaults to 'develop')
      "codeclimate": "a0a755b0fce22eb0b784", // codeclimate repo token (optional)
      "travis": "1a2b3c4d", // Travis 'Pro' private repo token (optional)
      "providers": { // Non-default badge provider configuration
        "status": {
          "text": "beta",
          "color": "blue"
        },
        "aux1": {
          "title": "github",
          "text": "source",
          "color": "4E73B6",
          "link": "https://github.com/MarkGriffiths/badges"
        }
      }
      "readme": { // Section with subtitles as map of arrays
        "Status": [
          [ "status", "npm", "travis-com", "david" ],
        ],
        "Dev Status": [
          [ "travis-com-dev", "david-dev", "david-devdeps-dev" ],
          [ "code-climate", "code-climate-coverage", "snyk" ]
        ],
        "Documentation/Help": [ "inch", "twitter" ]
      },
      "docs": [ // Lines as an array of arrays
        [ "aux1", "travis" ],
        [ "code-climate", "code-climate-coverage" ],
        [ "david" ]
      ]
    }

### Full list

| ID                      | Badge Description                                       | Link                             |
| :---------------------- | :------------------------------------------------------ | :------------------------------- |
| `status`                | Generic status                                          |                                  |
| `aux-1`                 | Generic aux 1                                           |                                  |
| `aux-2`                 | Generic aux 2                                           |                                  |
| `gitter`                | Gitter chat badge                                       | <https://gitter.im>              |
| `code-climate`          | Code Climate Maintainability                            | <https://codeclimate.com>        |
| `code-climate-coverage` | Code Climate Coverage                                   |                                  |
| `david`                 | David-dm dependency status badge                        | <https://david-dm.org>           |
| `david-dev`             | David-dm dependency status badge (dev branch)           |                                  |
| `david-devdeps`         | David-dm devDependency status badge                     |                                  |
| `david-devdeps-dev`     | David-dm devDependency status badge                     |                                  |
| `inch`                  | Inch-CI doumentation coverage                           | <https://inch-ci.org>            |
| `inch-dev`              | Inch-CI doumentation coverage (dev branch)              |                                  |
| `npm`                   | NPM published version                                   | <https://www.npmjs.com>          |
| `rollup`                | Show Rollup/Treeshaking module/mjs support              | <https://rollupjs.org/guide/en/> |
| `snyk`                  | Show Snyk Vulnerablilities                              | <https://snyk.io>                |
| `travis`                | Travis.org build status                                 | <https://travis.org>             |
| `travis-dev`            | Travis.org build status (dev branch)                    |                                  |
| `travis-com`            | Travis.com build status                                 | <https://travis.com>             |
| `travis-com-dev`        | Travis.com build status (dev branch)                    |                                  |
| `travis-pro`            | Travis.com build status with private token              |                                  |
| `travis-pro-dev`        | Travis.com build status with private token (dev branch) |                                  |

Where possible, <https://shields.io> is used, or shields.io 'flat' styling is chosen where available from other providers.


## Documentation

Full documentation can be found at [https://thebespokepixel.github.io/badges/][1]

[1]: https://thebespokepixel.github.io/badges/
