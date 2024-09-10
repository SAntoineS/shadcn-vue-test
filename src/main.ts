/*import { createApp } from 'vue'
import App from './App.vue'

import './assets/index.css'
createApp(App).mount('#app')*/


import App from './App.vue'


// ?inline can not handle import url() in css therefore fonts are not loaded, workaround is to add font css to the formApiRequest.vue
import style from './assets/index.css?inline'

import { pluginsWrapper } from './plugins'

import { defineCustomElement as VueDefineCustomElement, h, createApp, getCurrentInstance } from 'vue'
// @ts-ignore
import createWebComponent from 'vue-web-component-wrapper'

createWebComponent({
    rootComponent: App,
    elementName: 'web-comp',
    plugins: pluginsWrapper,
    cssFrameworkStyles: [style],
    VueDefineCustomElement,
    h,
    createApp,
    getCurrentInstance,
    disableStyleRemoval: false,
    disableShadowDOM: false,
})