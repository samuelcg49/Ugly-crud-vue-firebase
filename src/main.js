import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import { auth } from './utils/firebase'

auth.onAuthStateChanged((user) => {

  Vue.config.productionTip = false

  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')

  if (user) {
    console.log(user)
  } else {
    console.log("No hay usuario logueado")
  }
})
