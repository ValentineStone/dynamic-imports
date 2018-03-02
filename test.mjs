import dynamicImports from './index.js'

(async () => {

  dynamicImports.provide('cjsModule', 'module.exports = "cjs"')
  console.log(dynamicImports.require('cjsModule')) // "cjs"

  dynamicImports.provide('cjsDoge', `
    module.exports = {
      default: 'wow',
      more: 'such more',
      stuff: 'very stuff'
    }
  `)
  console.log(dynamicImports.require('cjsDoge')) // { default: 'wow', more: 'such more', stuff: 'very stuff' }

  dynamicImports.export('mjsDoge', `
    export default 'wow'
    export let more = 'such more'
    export let stuff = 'very stuff'
  `)
  console.log(await dynamicImports.import('mjsDoge')) // { default: 'wow', more: 'such more', stuff: 'very stuff' }
})()