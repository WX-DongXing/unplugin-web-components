# unplugin-web-components

## Install

```bash
npm i unplugin-web-components
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
