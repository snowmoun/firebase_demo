import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from "vuefire";
import firebase from 'firebase/app';
import 'firebase/firestore';
Vue.use(firestorePlugin);

// Get a Firebase instance
export const db = firebase
  .initializeApp({ projectId: 'test-86799' })
  .firestore()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
