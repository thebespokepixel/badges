// #### Installation

console.log('sh', 'npm install --save @thebespokepixel/badges')

// #### Setup

// Require (or import) the module…
const badges = require('../../index.js')

// …then do something with it.
function renderBadges() {
	badges('readme').then(markdown => {
		/* Output markdown to console... */
		console.log(markdown)
	})
}
