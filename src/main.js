import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import locale from 'element-ui/lib/locale/lang/en'
import Invoice from "vue-invoice";

Vue.use(Invoice, {store})
import VueHtmlToPaper from 'vue-html-to-paper';
Vue.use(VueHtmlToPaper);
// Vue.use(AdyenCheckout)
//clip
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)

import FusionCharts from 'fusioncharts';
import VueFusionCharts from 'vue-fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts'
Vue.use(VueFusionCharts, FusionCharts, Charts)

import VueSession from 'vue-session'
Vue.use(VueSession)
import firebase from 'firebase';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import Element from 'element-ui';
Vue.use(Element, { locale });
Vue.config.productionTip = false
Vue.use(require('vue-moment'));
var firebaseConfig = {
  apiKey: "AIzaSyDl1odIRtpB-HVG9n1ylwHvw5O1P7RBB2w",
  authDomain: "burgermania.com",
  projectId: "capstonefrontend-394b2",
  storageBucket: "capstonefrontend-394b2.appspot.com",
  messagingSenderId: "1092436291258",
  appId: "1:1092436291258:web:14a33bab0404c047b1dc83"
};
firebase.initializeApp(firebaseConfig);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


