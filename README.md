# dynamic-imports

Import / require dynamically from string sources

### API sketch:

```javascript
const dynamicImports = require('dynamic-imports')

await dynamicImports.provide('cjsModule', 'module.exports = "cjs"')
await dynamicImports.require('cjsModule') // "cjs"

await dynamicImports.export('mjsModule', 'export default "mjs"')
await dynamicImports.import('mjsModule') // "msj"

await dynamicImports.export('mjsDoge', `
  export default 'wow'
  export let more = 'such more'
  export let stuff = 'very stuff'
`)
await dynamicImports.import('mjsDoge') // 'wow'
await dynamicImports.import('mjsDoge', 'default', 'stuff') // { default: 'wow', stuff: 'very stuff' }
await dynamicImports.importAll('mjsDoge') // { default: 'wow', more: 'such more', stuff: 'very stuff' }

```
### Potential API changes / additions:
```
await dynamicImports.import('mjsDoge') // { default: 'wow', more: 'such more', stuff: 'very stuff' }
await dynamicImports.importAs('mjsDoge', 'default', 'stuff') // { default: 'wow', stuff: 'very stuff' }
await dynamicImports.importAs('mjsDoge', { default: 'doge' }) // { doge: 'wow' }
await dynamicImports.importDefault('mjsDoge') // 'wow'

await dynamicImports.requireAs('cjsModule', 'default') // { default: "cjs" }
await dynamicImports.requireAs('cjsModule', { default: 'type' }) // { type: "cjs" }
```
