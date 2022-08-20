import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

//global css
import './assets/main.css'

//firebase imports
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
 
let app

// firebase.auth().setPersistence(this.remember.checked ? fireauth.Auth.Persistence.LOCAL : fireauth.Auth.Persistence.SESSION)

//checks user state 
//onAuthStateChng fires before app is loaded
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
  }
})