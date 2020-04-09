<template>
  <v-app-bar id="NavBar" app clipped-left dense>
    <v-app-bar-nav-icon
      class="d-flex d-sm-none ml-1"
      @click="$emit('sidebar-toogle')"
    />
    <v-btn icon text exact-active-class="outlined" to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title class=" align-center d-none d-sm-flex">
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
    <v-btn icon class="active" @click="changeTheme">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
    <v-btn v-if="loggedIn" icon class="mr-1" @click="logOut">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <v-dialog v-else v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn icon class="mr-1" v-on="on">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
      <LogInModal @closeModal="dialog = false" />
    </v-dialog>
    <template v-if="loggedIn && !$vuetify.breakpoint.xsOnly" v-slot:extension>
      <NavLink :link="`/${profile}/edit_profile`">
        edit profile
      </NavLink>
      <NavLink v-if="isAdmin" :link="`/${profile}/admin_panel`">
        admin panel
      </NavLink>
      <NavLink :link="`/${profile}/my_friends`">
        My friends
      </NavLink>
      <NavLink :link="`/${profile}/my_repositories`">
        my repositories
      </NavLink>
      <NavLink :link="`/${profile}/my_articles`">
        my articles
      </NavLink>
      <NavLink :link="`/${profile}/my_portfolio`">
        my portfolio
      </NavLink>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import LogInModal from './LogInModal'
export default {
  name: 'Navbar',
  components: { LogInModal },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['profile', 'loggedIn', 'isAdmin'])
  },
  methods: {
    async logOut() {
      try {
        await this.$store.dispatch('logOut')
      } catch (e) {
        console.log(e)
      }
    },
    async changeTheme() {
      try {
        await this.$store.dispatch('changeTheme')
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      } catch (e) {
        console.log(e)
      }
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
  @media print
    display: none
</style>
