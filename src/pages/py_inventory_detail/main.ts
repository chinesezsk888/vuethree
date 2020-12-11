import { createApp } from 'vue'
import axios from 'axios'
import inventory from './components/inventory_page'
const app = createApp(inventory)
app.config.globalProperties.$axios = axios
app.config.globalProperties.mywindow = window
// import store from '@/store'
app.mount('#app')
// createApp(App).use(store).mount('#app')
