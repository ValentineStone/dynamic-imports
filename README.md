# dynamic-imports

Import / require dynamically from string sources

```javascript
const dynamicImports = require('dynamic-imports')

await dynamicImports.provide('cjsModule', 'module.exports = "cjs"')
await dynamicImports.require('cjsModule') // "cjs"

await dynamicImports.export('mjsModule', 'export default "mjs"')
await dynamicImports.import('mjsModule') // "msj"

await dynamicImports.export('mjsModuleMoreStuff', `
  export let more = 'such more'
  export let stuff = 'very stuff'
  export let wow = 'wow'
`)
await dynamicImports.import('mjsModuleMoreStuff', 'more', 'stuff') // { more: 'such more', stuff: 'very stuff' }
```
