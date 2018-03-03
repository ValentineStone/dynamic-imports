# dynamic-imports
*Import / require dynamically from string sources.*

dynamic-imports is a wrapper on top of vm.Script and vm.Module for require/provide and import/export correspondingly.

Currently only a subset of features of vm are implemented as I am trying to create consistent and simple API, more features such as module, script and context options might be added in the future

*Note that nested imports are currently not allowed in exported module sources, so the following will throw an error:*
```javascript
dynamicImports.export('does-not-work', 'import more from "even-more"')
```

Also note that using `import`/`export` functionality requires Node 9.6.0, as well as running it with `--experimental-vm-modules` and `--experimental-modules`, like so:
```bat
node --experimental-vm-modules --experimental-modules your-file.js
```

### Current API:

##### The most basic usage is as follows:

```javascript
import dynamicImports from 'dynamic-imports'

dynamicImports.provide('cjsDoge', `
  module.exports = {
    default: 'wow',
    more: 'such more',
    stuff: 'very stuff'
  }
`)

console.log(dynamicImports.require('cjsDoge'))
// { default: 'wow', more: 'such more', stuff: 'very stuff' }

dynamicImports.export('mjsDoge', `
  export default 'wow'
  export let more = 'such more'
  export let stuff = 'very stuff'
`)

console.log(await dynamicImports.import('mjsDoge'))
// { default: 'wow', more: 'such more', stuff: 'very stuff' }
```

##### You can also provide context sandboxes to modules
Do note how `sandbox.doge` reacts to changes in all scopes, since you are sharing it between contexts

```javascript
const sandbox = { doge: 'wow' }

dynamicImports.provide('cjsDoge', `
  module.exports = newDoge => newDoge ? doge = newDoge : doge
`, { sandbox })

console.log(dynamicImports.require('cjsDoge')())
// 'wow'
console.log(dynamicImports.require('cjsDoge')('nova'))
// 'nova'
console.log(dynamicImports.require('cjsDoge')())
// 'nova'

dynamicImports.export('mjsDoge', `
  export default newDoge => newDoge ? doge = newDoge : doge
`, { sandbox })

console.log((await dynamicImports.import('mjsDoge')).default())
// 'nova'
console.log((await dynamicImports.import('mjsDoge')).default('supernova'))
// 'supernova'
console.log((await dynamicImports.import('mjsDoge')).default())
// 'supernova'

console.log(sandbox.doge)
// 'supernova'

```