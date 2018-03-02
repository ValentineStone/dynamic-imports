# dynamic-imports

Import / require dynamically from string sources

### Current API:

```javascript
const dynamicImports = require('dynamic-imports')

dynamicImports.provide('cjsModule', 'module.exports = "cjs"')
dynamicImports.require('cjsModule') // "cjs"

dynamicImports.export('mjsModule', 'export default "mjs"')
await dynamicImports.import('mjsModule') // "msj"

dynamicImports.export('mjsDoge', `
  export default 'wow'
  export let more = 'such more'
  export let stuff = 'very stuff'
`)
await dynamicImports.import('mjsDoge') // 'wow'
await dynamicImports.import('mjsDoge', 'default', 'stuff') // { default: 'wow', stuff: 'very stuff' }
await dynamicImports.importAll('mjsDoge') // { default: 'wow', more: 'such more', stuff: 'very stuff' }
//    ^^^^^^^^^^^^^^^^^^^^^^^^ potential deprecation

```
### Potential API changes / additions:

```javascript
await dynamicImports.import('mjsDoge') // { default: 'wow', more: 'such more', stuff: 'very stuff' }
await dynamicImports.importAs('mjsDoge', 'default', 'stuff') // { default: 'wow', stuff: 'very stuff' }
await dynamicImports.importAs('mjsDoge', { doge: 'default' }) // { doge: 'wow' }
await dynamicImports.importDefault('mjsDoge') // 'wow'

dynamicImports.export('cjsDoge', `
  module.exports = {
    basic: 'wow'
    more: 'such more'
    stuff: 'very stuff'
  }
`)
dynamicImports.requireAs('cjsDoge', 'stuff') // { stuff: 'very stuff' }
dynamicImports.requireAs('cjsDoge', { doge: 'basic' }) // { doge: "wow" }
```