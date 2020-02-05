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
  <!--            name: 'userSlug-my_repositories',-->
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
  <v-app-bar app clipped-left dense>
    <v-app-bar-nav-icon @click="$emit('sidebar-toogle')" />
    <v-btn icon text exact-active-class="outlined" to="/"
      ><v-icon>mdi-home</v-icon></v-btn
    >
    <v-btn @click="$router.back()" icon><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-toolbar-title class=" align-center">
      <v-btn text exact-active-class="outlined" to="/users">
        <span>USERS</span>
      </v-btn>

      <v-btn text exact-active-class="outlined" to="/repositories">
        <span>REPOSITORIES</span>
      </v-btn>

      <v-btn text exact-active-class="outlined" to="/articles">
        <span>ARTICLES</span>
      </v-btn>
    </v-toolbar-title>
    <v-spacer />
    <v-menu bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-btn icon><v-icon>mdi-translate</v-icon></v-btn>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>English</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Russian</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-btn icon><v-icon>mdi-invert-colors</v-icon></v-btn>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>Dark</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Light</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon><v-icon>mdi-logout</v-icon></v-btn>
    <template v-slot:extension v-if="$store.getters.user.id">
      <v-tabs align-with-title>
        <v-tab
          @click="$router.push(`/${$store.getters.user.profile}/edit_profile`)"
          >Admin panel</v-tab
        >
        <v-tab
          @click="$router.push(`/${$store.getters.user.profile}/my_friends`)"
          >Friends</v-tab
        >
        <v-tab
          @click="$router.push(`/${$store.getters.user.profile}/my_articles`)"
          >My articles</v-tab
        >
        <v-tab
          @click="
            $router.push(`/${$store.getters.user.profile}/my_repositories`)
          "
          >My repositories</v-tab
        >
        <v-tab
          @click="$router.push(`/${$store.getters.user.profile}/admin_panel`)"
          >Admin panel</v-tab
        >
      </v-tabs>
    </template>
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
