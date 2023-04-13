import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Load Bootstrap, BootstrapIcons
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(router).mount('#app')
