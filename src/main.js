import Vue from 'vue'
import App from './App.vue'
//清除默认样式
import "normalize.css"
import "@/assets/css/base.css"

// ElementUI
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI

//路由
import VueRouter from "vue-router";

Vue.use(VueRouter)
import router from "@/router";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
