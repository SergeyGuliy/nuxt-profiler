<template>
  <!--  <div>-->
  <!--    <h1 v-if="$store.getters.user">{{ $store.getters.user.profile }}</h1>-->
  <!--    <h1 v-else>You are not logged in</h1>-->
  <!--    <div>-->
  <!--      <nuxt-link to="/">Home</nuxt-link>-->
  <!--      <nuxt-link to="/users">USERS</nuxt-link>-->
  <!--      <nuxt-link to="/articles">ARTICLES</nuxt-link>-->
  <!--      <nuxt-link to="/repositories">REPOSITORIES</nuxt-link>-->
  <!--      <span v-if="!$store.getters.user">-->
  <!--        <nuxt-link to="/login">Login</nuxt-link>-->
  <!--        <nuxt-link to="/registration">Registratiom</nuxt-link>-->
  <!--      </span>-->
  <!--      <span v-else>-->
  <!--        <nuxt-link-->
  <!--          :to="{-->
  <!--            name: 'userSlug-edit-profile',-->
  <!--            params: { userSlug: $store.getters.user.profile }-->
  <!--          }"-->
  <!--          >user-edit-profile</nuxt-link-->
  <!--        >-->
  <!--        <nuxt-link-->
  <!--          :to="{-->
  <!--            name: 'userSlug-friends-list',-->
  <!--            params: { userSlug: $store.getters.user.profile }-->
  <!--          }"-->
  <!--          >friends-list</nuxt-link-->
  <!--        >-->
  <!--        <nuxt-link-->
  <!--          :to="{-->
  <!--            name: 'userSlug-admin-panel',-->
  <!--            params: { userSlug: $store.getters.user.profile }-->
  <!--          }"-->
  <!--          >admin-panel</nuxt-link-->
  <!--        >-->
  <!--        <nuxt-link-->
  <!--          :to="{-->
  <!--            name: 'userSlug-my_articles',-->
  <!--            params: { userSlug: $store.getters.user.profile }-->
  <!--          }"-->
  <!--          >my articles</nuxt-link-->
  <!--        >-->
  <!--        <nuxt-link-->
  <!--          :to="{-->
  <!--            name: 'userSlug-my_rerepositories',-->
  <!--            params: { userSlug: $store.getters.user.profile }-->
  <!--          }"-->
  <!--          >my repos</nuxt-link-->
  <!--        >-->
  <!--        <nuxt-link-->
  <!--          :to="{-->
  <!--            name: 'userSlug-my_friends',-->
  <!--            params: { userSlug: $store.getters.user.profile }-->
  <!--          }"-->
  <!--          >my friends</nuxt-link-->
  <!--        >-->
  <!--        <a @click.prevent="logOut">LogOut</a>-->
  <!--      </span>-->
  <!--    </div>-->
  <!--  </div>-->
  <v-app-bar app clipped-left color="red" dense>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-btn fab height="45" width="45" text
      ><v-icon class="mx-2">mdi-home</v-icon></v-btn
    >
    <v-btn fab height="45" width="45" text
      ><v-icon class="mx-2">mdi-arrow-left</v-icon></v-btn
    >
    <v-toolbar-title class="mr-12 align-center">
      <span class="title">Nuxt Profiler</span>
    </v-toolbar-title>
    <v-spacer />
    <v-row align="center" style="max-width: 650px">
      <v-btn fab height="45" width="45" text
        ><v-icon class="mx-2 right">mdi-logout</v-icon></v-btn
      >
    </v-row>
  </v-app-bar>
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

<style scoped></style>
