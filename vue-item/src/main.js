import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'


import Header from "@/components/Header"
Vue.component("Head",Header)

Vue.filter("setWH",(url,arg)=>{
  return url.replace(/w\.h/,arg)
})

// 导入 vant 
import Vant from "vant";
Vue.use(Vant);   // 全局配置  

import { Icon } from 'vant';

Vue.use(Icon);

import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe).use(SwipeItem);


import { NoticeBar } from 'vant';

Vue.use(NoticeBar);







// 导入 vue-resource ,  axios 
import VueResource from "vue-resource";
Vue.use(VueResource);  // this.$http    Vue.http 请求数据 


import axios from "@/util/token.js";
Vue.prototype.axios = axios;




// import Vue from 'vue'
// import App from './App'
// import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
// Vue.config.productionTip = false
// new Vue({
// el: '#app',
// router,
// components: { App },
// template: '<App/>'
// })






Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
