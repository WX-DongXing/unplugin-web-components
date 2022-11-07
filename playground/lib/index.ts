import { defineCustomElement } from 'vue'
// import { styles } from 'virtual:unplugin-web-components'
import WCExample from './WCExample.vue'

customElements.define('wc-example',
  defineCustomElement(
    Object.assign(WCExample, { styles: '' }),
  ),
)
