const vm = require('vm')

const scripts = {}
const modules = {}
const linker = () => { throw new Error('dynamic-imports modules do not allow nested import statements') }

module.exports = {

  provide(name, code, { sandbox } = {}) {
    let script = new vm.Script(`(module => {${code};return module.exports})({exports:{}})`)
    scripts[name] = script.runInContext(vm.createContext(sandbox))
  },

  require(name) {
    if (name in scripts)
      return scripts[name]
    else
      throw new Error(`dynamic-imports unable to require(): "${name}" is not provided`)
  },

  export(name, code, { sandbox } = {}) {
    modules[name] = new Promise(async resolve => {
      let module = new vm.Module(code, { context: vm.createContext(sandbox) })
      await module.link(linker)
      module.instantiate()
      await module.evaluate()
      modules[name] = module.namespace
      resolve()
    })
  },

  async import(name) {
    if (name in modules) {
      await modules[name]
      return modules[name]
    }
    else
      throw new Error(`dynamic-imports unable to import(): "${name}" is not exported`)
  }

}