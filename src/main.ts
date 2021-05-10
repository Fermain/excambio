import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store, key } from './store'
import firebase from 'firebase/app'
import 'firebase/analytics'
import VueApexCharts from 'vue3-apexcharts'

firebase.initializeApp({})

createApp(App)
  .use(VueApexCharts)
  .use(store, key)
  .use(router)
  .mount('#app')
