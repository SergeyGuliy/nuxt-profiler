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
  async mounted() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await (await firebase.auth().currentUser).uid
        this.$cookies.set('access_token', token)
      } else {
        this.$cookies.remove('access_token')
      }
    })
  }
}
</script>

<style scoped lang="sass"></style>
