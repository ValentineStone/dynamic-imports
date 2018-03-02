import dynamicImports from './index.js'

(async () => {
  await dynamicImports.export('mjsDoge', `
  export default 'wow'
  export let more = 'such more'
  export let stuff = 'very stuff'
`)
  console.log(await dynamicImports.import('mjsDoge')) // 'wow'
  console.log(await dynamicImports.import('mjsDoge', 'default', 'stuff')) // { default: 'wow', stuff: 'very stuff' }
  console.log(await dynamicImports.importAll('mjsDoge')) // { default: 'wow', more: 'such more', stuff: 'very stuff' }
})()