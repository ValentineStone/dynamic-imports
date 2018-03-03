import dynamicImports from './index.js'

(async () => {

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

})()