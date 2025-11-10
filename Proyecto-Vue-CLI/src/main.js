import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import './bootstrap.js' 
import router from './router.js'    

const app = createApp(App) /* instancia de vue */
app.use(router) /* uso del router */
app.mount('#app')  /* instancia de vue */
