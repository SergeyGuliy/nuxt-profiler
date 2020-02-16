<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Empty',
  async mounted() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await (await firebase.auth().currentUser).uid
        this.$cookies.set('access_token', token)
      } else {
        this.$cookies.remove('access_token')
      }
    })
  },
  middleware: 'isLoggedIn'
}
</script>

<style scoped></style>
