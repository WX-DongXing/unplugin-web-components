# unplugin-web-components

Building vue3 components to webComponents on vite

## Install

```bash
npm i -D unplugin-web-components
```

## Use

`lib/index.ts`

```typescript
import { defineCustomElement } from 'vue'
import { styles } from 'virtual:unplugin-web-components'
import Example from '@/components/Example.vue'

const WCExample = defineCustomElement(Object.assign(WCExample, { styles }))

customElement.define('wc-example', WCExample)
```

`env.d.ts`

```typescript
declare module 'virtual:unplugin-web-components' {
  export const styles: string[]
}
```

`vite.config.ts`

```typescript
import vue from '@vitejs/plugin-vue'
import WebComponents from 'unplugin-web-components/vite'

export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [vue(), WebComponents()],
  build: {
    lib: {
      name: 'WCExample',
      formats: ['es', 'umd']
      entry: resolve(__dirname, 'lib/index.ts'),
      fileName: (format) => `wc-example.${format}.js`,
    }
  }
})
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import WebComponents from 'unplugin-web-components/vite'

export default defineConfig({
  plugins: [
    WebComponents({
      /* options */
    })
  ]
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import WebComponents from 'unplugin-web-components/rollup'

export default {
  plugins: [
    WebComponents({
      /* options */
    })
  ]
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-web-components/webpack')({
      /* options */
    })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    [
      'unplugin-web-components/nuxt',
      {
        /* options */
      }
    ]
  ]
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-web-components/webpack')({
        /* options */
      })
    ]
  }
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import WebComponents from 'unplugin-web-components/esbuild'

build({
  plugins: [WebComponents()]
})
```

<br></details>

## License

[MIT](https://github.com/WX-DongXing/unplugin-web-components/blob/main/LICENSE)

Copyright (c) 2022 Dong Xing
