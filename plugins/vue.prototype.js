import Vue from 'vue'

Vue.prototype.$sa = (selector) => window.document.querySelectorAll(selector)
Vue.prototype.$s = (selector) => window.document.querySelector(selector)
Vue.prototype.$eventBus = new Vue()
