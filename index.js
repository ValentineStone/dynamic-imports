const vm = require('vm')

const scripts = {}
const modules = {}
const linker = () => { throw new Error('dynamic-imports modules do not allow nested import statements') }

module.exports = {

  async provide(name, code) {
    let script = new vm.Script(`(module => {${code};return module.exports})({exports:{}})`)
    scripts[name] = script.runInNewContext()
  },

  async require(name) {
    if (name in scripts)
      return scripts[name]
    else
      throw new Error(`dynamic-imports unable to require(): "${name}" is not provided`)
  },

  async export(name, code) {
    let module = new vm.Module(code, { context: vm.createContext() })
    await module.link(linker)
    module.instantiate()
    await module.evaluate()
    modules[name] = module.namespace
  },

  async import(name, ...namedExports) {
    if (name in modules)
      if (namedExports.length) {
        let selectedExports = {}
        for (let namedExport of namedExports)
        selectedExports[namedExport] = modules[name][namedExport]
        return selectedExports
      }
      else
        return modules[name].default
    else
      throw new Error(`dynamic-imports unable to import(): "${name}" is not exported`)
  },

  async importAll(name) {
    if (name in modules)
      return modules[name]
    else
      throw new Error(`dynamic-imports unable to import(): "${name}" is not exported`)
  }

}