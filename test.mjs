import dynamicImports from './index.js'

(async () => {

  dynamicImports.provide('cjsModule', 'module.exports = "cjs"')
  console.log(dynamicImports.require('cjsModule')) // "cjs"

  dynamicImports.export('mjsModule', 'export default "mjs"')
  console.log(await dynamicImports.import('mjsModule')) // "msj"

  dynamicImports.export('mjsDoge', `
    export default 'wow'
    export let more = 'such more'
    export let stuff = 'very stuff'
  `)
  console.log(await dynamicImports.import('mjsDoge')) // 'wow'
  console.log(await dynamicImports.import('mjsDoge', 'default', 'stuff')) // { default: 'wow', stuff: 'very stuff' }
  console.log(await dynamicImports.importAll('mjsDoge')) // { default: 'wow', more: 'such more', stuff: 'very stuff' }
})()