<template>
  <div>
    <h1 v-if="$store.getters.user">{{ $store.getters.user.profile }}</h1>
    <h1 v-else>You are not logged in</h1>
    <div>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/users">USERS</nuxt-link>
      <nuxt-link to="/articles">ARTICLES</nuxt-link>
      <nuxt-link to="/repositories">REPOSITORIES</nuxt-link>
      <span v-if="!$store.getters.user">
        <nuxt-link to="/login">Login</nuxt-link>
        <nuxt-link to="registration">Registratiom</nuxt-link>
      </span>
      <span v-else>
        <nuxt-link
          :to="{
            name: 'userSlug-edit-profile',
            params: { userSlug: $store.getters.user.profile }
          }"
          >user-edit-profile</nuxt-link
        >
        <nuxt-link
          :to="{
            name: 'userSlug-friends-list',
            params: { userSlug: $store.getters.user.profile }
          }"
          >friends-list</nuxt-link
        >
        <nuxt-link
          :to="{
            name: 'userSlug-my-admin-panel',
            params: { userSlug: $store.getters.user.profile }
          }"
          >admin-panel</nuxt-link
        >
        <nuxt-link
          :to="{
            name: 'userSlug-my-articles',
            params: { userSlug: $store.getters.user.profile }
          }"
          >my articles</nuxt-link
        >
        <nuxt-link
          :to="{
            name: 'userSlug-my-repositories',
            params: { userSlug: $store.getters.user.profile }
          }"
          >my repos</nuxt-link
        >
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
  margin: 0 5px;
  background-color: orangered;
  border: 1px solid blue;
  padding: 5px;
}
</style>
