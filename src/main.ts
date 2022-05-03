import { createApp } from 'vue'
import App from './App.vue'
// import virListV3 from '../packages/src'

// import virListV3 from '../vir-list-v3'
// import '../vir-list-v3/index.css'

import virListV3 from 'vir-list-v3'
import 'vir-list-v3/index.css'

// import virListV3 from '../packages/vir-list-v3'
// import '../packages/vir-list-v3/index.css'

// import virListV3 from '../packages/vir-list-v3-source/index'

const app = createApp(App)
app.use(virListV3)
app.mount('#app')
