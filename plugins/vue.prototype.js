import Vue from 'vue'

Vue.prototype.$sa = (selector) => window.document.querySelectorAll(selector)
Vue.prototype.$s = (selector) => window.document.querySelector(selector)
Vue.prototype.$addClass = (el, name) => {
  if (!el.classList.contains(name)) {
    return el.classList.add(name)
  }
}
Vue.prototype.$removeClass = (el, name) => {
  if (el.classList.contains(name)) {
    return el.classList.remove(name)
  }
}
Vue.prototype.$eventBus = new Vue()
