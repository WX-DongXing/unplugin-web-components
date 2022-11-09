import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import WebComponents from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('wc-'),
        },
      },
    }),
    AutoImport({
      imports: ['vue'],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    WebComponents({
      name: 'wc-example',
    }),
  ],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'WCExample',
      fileName: format => `wc-example.${format}.js`,
      formats: ['es'],
    },
  },
})
