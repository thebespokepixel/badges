# Badges

> Automatically render project badges into readme and documentation files, with consistent styling.

${badges}

There's a wealth of status badges available out there, but even using a service like https://shields.io still doesn't cover everything and what it covers can be missing functionality… 

…how about handling differences in your published and development branches?

…and, of course, you want it all looking organised and consistent, as much as possible…

Doing it properly means too much faffing about, despite it being useful to have 'at-a-glance' status reporting. This module is my attempt to cover off all that badge work into something I can simply include in `package.json` and move on.

If there are badges you'd like to see included, add an issue above, or better still a PR and I'll add it. 

## Usage
${usage}

## Supported badges

- Status (plus similar aux1 and aux2)
- Travis (.org and .com)
- Travis private repos (requires a `travis` private repo token)
- Libraries.io [New]
- Code Climate and Code Climate Coverage (requires a `codeclimate` repo token)
- Inch CI
- npm
- Rollup
- Snyk
- Gitter
- Twitter

David has been dropped as it seems the site is now dead.

## Configuration

In `package.json`...

```
...
"badges": {
  "name": "badges", // Package name
  "github": "thebespokepixel", // github user
  "npm": "thebespokepixel", // npm user
  "libraries-io": "TheBespokePixel", // libraries-io github user (seems to use the name)
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
      [ "status", "npm", "travis-com", "libraries-io-npm" ],
    ],
    "Dev Status": [
      [ "travis-com-dev", "libraries-io-repo" ],
      [ "code-climate", "code-climate-coverage", "snyk" ]
    ],
    "Documentation/Help": [ "inch", "twitter" ]
  },
  "docs": [ // Lines as an array of arrays
    [ "aux1", "travis" ],
    [ "code-climate", "code-climate-coverage" ],
    [ "libraries-io-npm" ]
  ]
}
```

### Full list

|ID|Badge Description|Link|
|:-|:-|:-|
|`status`|Generic status|
|`aux-1`|Generic aux 1|
|`aux-2`|Generic aux 2|
|`gitter`|Gitter chat badge|https://gitter.im|
|`code-climate`|Code Climate Maintainability|https://codeclimate.com|
|`code-climate-coverage`|Code Climate Coverage|
|`libraries-io-npm`|Libraries.io latest release dependency status badge|https://libraries.io|
|`libraries-io-repo`|Libraries.io repo deep dependency status badge (dev branch)|
|`inch`|Inch-CI doumentation coverage|https://inch-ci.org|
|`inch-dev`|Inch-CI doumentation coverage (dev branch)|
|`npm`|NPM published version|https://www.npmjs.com|
|`rollup`|Show Rollup/Treeshaking module/mjs support|https://rollupjs.org/guide/en/|
|`snyk`|Show Snyk Vulnerablilities|https://snyk.io|
|`travis`| Travis.org build status|https://travis.org|
|`travis-dev`| Travis.org build status (dev branch)|
|`travis-com`| Travis.com build status|https://travis.com|
|`travis-com-dev`| Travis.com build status (dev branch)|
|`travis-pro`|  Travis.com build status with private token|
|`travis-pro-dev`| Travis.com build status with private token (dev branch)|

Where possible, https://shields.io is used, or shields.io 'flat' styling is chosen where available from other providers.

## Documentation
Full documentation can be found at [https://thebespokepixel.github.io/badges/][1]

[1]: https://thebespokepixel.github.io/badges/
