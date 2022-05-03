import { App } from 'vue'
import VirListV3 from './components/index.vue'

const virListV3Plugin = {
  install(app: App) {
		app.component('vir-list-v3', VirListV3)
	}
}

export default virListV3Plugin