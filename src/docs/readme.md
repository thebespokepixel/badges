# Badges

> Automatically render project badges into readme and documentation files.

${badges}

## Usage
${usage}

## Supported badges

- Status (plus similar aux1 and aux2)
- Travis
- Travis Pro (requires a `travis` private repo token)
- David and David-dev
- CodeClimate and CodeClimate-coverage (requires a `codeclimate` repo token)
- Inch CI
- npm
- Rollup
- Snyk
- Gitter
- Greenkeeper
- Greenkeeper Pro (requires a `greenkeeper` private repo token)

## Configuration

In `package.json`...

```
...
"badges": {
  "github": "MarkGriffiths", // github user
  "npm": "thebespokepixel", // npm user
  "codeclimate": "a0a755b0fce22eb0b784", // codeclimate repo token
  "travis": "1a2b3c4d", // Travis 'Pro' private repo token
  "greenkeeper": "1a2b3c4d", // Greenkeeper private repo token
  "name": "badges", // Package name
  "style": "flat", // Badge style (default 'flat')
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
      [ "status", "npm", "travis", "david" ],
      [ "code-climate", "code-climate-coverage", "snyk" ]
    ],
    "Developer": [ "david-dev", "rollup" ],
    "Help": [ "inch", "gitter" ]
  },
  "docs": [ // Lines as an array of arrays
    [ "aux1", "travis" ],
    [ "code-climate", "code-climate-coverage" ],
    [ "david" ]
  ]
}
```

## Documentation
Full documentation can be found at [https://markgriffiths.github.io/badges/][1]

[1]: https://markgriffiths.github.io/badges/
