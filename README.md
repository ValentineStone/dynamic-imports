# dynamic-imports

Import / require dynamically from string sources
Is a wrapper on top of vm.Script and vm.Module for require/provide and import/export correspondingly

All the code is evaluated in new empty contexts (at least for now)

Also, nested imports are not allowed in exported module sources, so the following will throw an error:
```javascript
dynamicImports.export('does-not-work', 'import more from "even-more"')
```

### Current API:

```javascript
const dynamicImports = require('dynamic-imports')

dynamicImports.provide('cjsModule', 'module.exports = "cjs"')
dynamicImports.require('cjsModule') // "cjs"

dynamicImports.provide('cjsDoge', `
  module.exports = {
    default: 'wow',
    more: 'such more',
    stuff: 'very stuff'
  }
`)
dynamicImports.require('cjsDoge') // { default: 'wow', more: 'such more', stuff: 'very stuff' }

dynamicImports.export('mjsDoge', `
  export default 'wow'
  export let more = 'such more'
  export let stuff = 'very stuff'
`)
await dynamicImports.import('mjsDoge') // { default: 'wow', more: 'such more', stuff: 'very stuff' }

```