import Vue from 'vue'
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

const options = {
  transition: 'Vue-Toastification__fade',
  maxToasts: 5,
  newestOnTop: true
}

Vue.use(Toast, options)
