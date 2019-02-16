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
