import { createFilter } from '@rollup/pluginutils'
import CleanCss from 'clean-css'

const minifyCss = (parse) => {
  const css = parse.body[0].declaration.callee.body.value
  const output = new CleanCss().minify(css)
  return output.styles.replace(/(\\)/g, '\\u')
}

const splitCss = (css = '') => {
  const pattern = /(:root{.+?})/g
  const rootVars = Array.from(css.match(pattern) ?? [])
  const styleStr = css.replace(pattern, '')
  return [rootVars, styleStr]
}

export default function WebComponent(options = {}) {
  const virtualModuleId = 'virtual:vite-plugin-webcomponent'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  const filter = createFilter(['**/*.css'])

  // 内联样式
  const inlineStyles = []

  // css 变量样式
  const varStyles = []

  // global 样式
  const globalStyles = []

  const elementPlus = ['el-popper', 'el-cascader']

  return {
    name: 'vite-plugin-webcomponent',
    enforce: 'post',
    apply: 'build',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const styles = "${virtualModuleId}"`
      }
    },
    async transform(code, id) {
      if (!filter(id)) return
      // console.log(id);
      const parse = await this.parse(code)
      const css = minifyCss(parse)

      for (let fileName of elementPlus) {
        if (id.includes(fileName)) {
          globalStyles.push(css)
          return null
        }
      }

      const [vars, styleStr] = splitCss(css)
      varStyles.push(...vars)
      inlineStyles.push(styleStr)
    },
    renderChunk(code, _, { entryFileNames }) {
      console.log(globalStyles.length)
      let varCode = ''
      if (/\.js$/.test(entryFileNames)) {
        varCode = `
                    const rootStyle = document.createElement('style')
                    rootStyle.innerText = \`${[
                      ...varStyles,
                      ...globalStyles
                    ].join(' ')}\`
                    document.head.append(rootStyle)
                `
      }
      const styleArray = [...inlineStyles, ...globalStyles]
        .reduce((acc, cur) => {
          acc.push(`(() => \`${cur}\`)()`)
          return acc
        }, [])
        .join(',')
      return {
        code:
          code.replace(new RegExp(`"${virtualModuleId}"`), `[${styleArray}]`) +
          varCode
      }
    }
  }
}
