<template>
  <v-app-bar id="NavBar" app clipped-left dense>
    <v-app-bar-nav-icon @click="$emit('sidebar-toogle')" />
    <v-btn icon text exact-active-class="outlined" to="/"
      ><v-icon>mdi-home</v-icon></v-btn
    >
    <v-btn @click="$router.back()" icon><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-toolbar-title class=" align-center">
      <NavLink link="/users">
        All users
      </NavLink>
      <NavLink link="/repositories">
        All repositories
      </NavLink>
      <NavLink link="/articles">
        all articles
      </NavLink>
    </v-toolbar-title>
    <v-spacer />
    <!--    <v-btn icon><v-icon>mdi-translate</v-icon></v-btn>-->
    <v-btn
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      icon
      class="active"
      ><v-icon>mdi-invert-colors</v-icon>
    </v-btn>
    <v-btn @click="logOut" icon><v-icon>mdi-logout</v-icon></v-btn>
    <template v-slot:extension v-if="$store.getters.user.id">
      <NavLink :link="`/${$store.getters.user.profile}/edit_profile`">
        edit profile
      </NavLink>
      <NavLink
        :link="`/${$store.getters.user.profile}/admin_panel`"
        v-if="$store.getters.user.isAdmin"
      >
        admin panel
      </NavLink>
      <NavLink :link="`/${$store.getters.user.profile}/my_friends`">
        my friends
      </NavLink>
      <NavLink :link="`/${$store.getters.user.profile}/my_repositories`">
        my repositories
      </NavLink>
      <NavLink :link="`/${$store.getters.user.profile}/my_articles`">
        my articles
      </NavLink>
    </template>
  </v-app-bar>
</template>

<script>
import NavLink from '../misc/NavLink'
export default {
  name: 'Navbar',
  components: { NavLink },
  methods: {
    async logOut() {
      try {
        await this.$store.dispatch('logOut')
        this.$router.push('/login')
      } catch (e) {}
    }
  }
}
</script>

<style lang="sass">
#NavBar
  .v-toolbar__content, .v-toolbar__extension
    padding: 0 10px
  .v-btn.v-btn--icon
    width: 30px
    height: 30px
  .v-btn
    padding: 0 5px
</style>
