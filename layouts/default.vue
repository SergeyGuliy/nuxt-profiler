<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import firebase from 'firebase'
import Navbar from '../components/Navbar'
import 'firebase/auth'
export default {
  components: { Navbar },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('fetchUserInfo')
      }
    })
  }
}
</script>

<style scoped lang="sass">
div
  background-color: red
  color: white
</style>
