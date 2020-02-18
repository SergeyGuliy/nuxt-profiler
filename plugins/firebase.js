import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDP3ynTVKrCIdTzc8BrusWOVIM0mvBw6ws',
  authDomain: 'nuxt-profiler.firebaseapp.com',
  databaseURL: 'https://nuxt-profiler.firebaseio.com',
  projectId: 'nuxt-profiler',
  storageBucket: 'nuxt-profiler.appspot.com',
  messagingSenderId: '39387800930',
  appId: '1:39387800930:web:c15b8499393b2b0088383b',
  measurementId: 'G-QFMBYRP2J7'
}

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}
console.log(app)

export default firebase
