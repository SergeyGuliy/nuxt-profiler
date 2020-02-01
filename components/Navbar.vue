<template>
  <div>
    <h1 v-if="$store.getters.user">{{ $store.getters.user.profile }}</h1>
    <h1 v-else>You are not logged in</h1>
    <div>
      <nuxt-link to="/">Home</nuxt-link>
      <span v-if="!$store.getters.user">
        <nuxt-link to="/login">Login</nuxt-link>
        <nuxt-link to="registration">Registratiom</nuxt-link>
      </span>
      <span v-else>
        <a @click.prevent="logOut">LogOut</a>
      </span>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Navbar',
  methods: {
    async logOut() {
      try {
        await firebase.auth().signOut()
        this.$store.commit('cleanUser')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
a {
  margin: 0 20px;
  background-color: orangered;
  border: 1px solid blue;
  padding: 5px;
}
</style>
