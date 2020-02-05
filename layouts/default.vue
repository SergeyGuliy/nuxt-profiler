<template>
  <v-app id="inspire">
    <Navbar />
    <nuxt />
  </v-app>
</template>

<script>
import firebase from 'firebase'
import Navbar from '../components/Navbar'
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
