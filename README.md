# dynamic-imports

Import / require dynamically from string sources

```javascript
const dynamicImports = require('dynamic-imports')

await dynamicImports.provide('cjsModule', 'module.exports = "cjs"')
await dynamicImports.require('cjsModule') // "cjs"

await dynamicImports.export('mjsModule', 'export default "mjs"')
(await dynamicImports.import('mjsModule')).default // "msj"
```
