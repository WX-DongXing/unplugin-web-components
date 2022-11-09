import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { generate, parse, walk } from 'css-tree'
import type { Options } from './types'

const virtualModuleId = 'virtual:unplugin-web-components'

const resolvedVirtualModuleId = `\0 ${virtualModuleId}`

const filter = createFilter(['**/*.css'])

const inlineStyles: string[] = []

export default createUnplugin<Options | undefined>(options => ({
  name: 'unplugin-web-components',
  apply: 'build',
  resolveId(id) {
    if (id === virtualModuleId)
      return resolvedVirtualModuleId
  },
  load(id) {
    if (id === resolvedVirtualModuleId)
      return `export const styles = "${virtualModuleId}"`
  },
  transform(code, id) {
    if (!filter(id))
      return

    const ast = parse(code)

    walk(ast, (node) => {
      // replace `:root` to `:host`
      if (node.type === 'PseudoClassSelector' && node.name === 'root')
        node.name = 'host'
    })

    inlineStyles.push(`(() => \`${generate(ast)}\`)()`)

    return {
      code: '',
    }
  },
  renderChunk(code: string) {
    return {
      code: code.replace(new RegExp(`"${virtualModuleId}"`), `[${inlineStyles.join(',')}]`),
    }
  },
}))
