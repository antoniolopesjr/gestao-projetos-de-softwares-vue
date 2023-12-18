import { createApp } from 'vue'
import './style.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import store from '@/store'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faTrash, faPencil, faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

loadFonts()

library.add(faTrash, faPencil, faPlus, faEllipsisV)

const app = createApp(App).component('FaIcon', FontAwesomeIcon)

app.use(VueSweetalert2)
app.use(vuetify)
app.use(router)
app.use(store)

app.mount('#app')
