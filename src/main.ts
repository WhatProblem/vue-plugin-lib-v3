import { createApp } from 'vue'
import App from './App.vue'
import virListV3 from '../packages/index'

const app = createApp(App)
app.use(virListV3)
app.mount('#app')
