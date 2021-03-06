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
        All articles
      </NavLink>
    </v-toolbar-title>
    <v-spacer />
    <!--    <v-btn icon><v-icon>mdi-translate</v-icon></v-btn>-->
    <v-btn icon class="active toggleTheme" @click="changeTheme">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
    <v-btn v-if="loggedIn" icon class="mr-1 loggOut" @click="logOut">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <v-dialog v-else v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn icon class="mr-1 loggIn" v-on="on">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
      <LogInModal @closeModal="dialog = false" />
    </v-dialog>
    <template v-if="loggedIn && !$vuetify.breakpoint.xsOnly" v-slot:extension>
      <NavLink :link="`/${profile}/edit_profile`">
        Edit profile
      </NavLink>
      <NavLink v-if="isAdmin" :link="`/${profile}/admin_panel`">
        Admin panel
      </NavLink>
      <NavLink :link="`/${profile}/my_friends`">
        My friends
      </NavLink>
      <NavLink :link="`/${profile}/my_repositories`">
        My repositories
      </NavLink>
      <NavLink :link="`/${profile}/my_articles`">
        My articles
      </NavLink>
      <NavLink :link="`/${profile}/my_portfolio`">
        My portfolio
      </NavLink>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import LogInModal from './EnterModal/EnterModal'
import NavLink from '~/components/buttons_components/NavLink'

export default {
  name: 'Navbar',
  components: { LogInModal, NavLink },
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
        this.$dialog.message.success(`You logged out from base.`, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (e) {
        console.log(`Error while trying to log out: ${e}`)
      }
    },
    async changeTheme() {
      try {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        await this.$store.dispatch('changeTheme')
        this.$dialog.message.success(`You changed theme.`, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (e) {
        console.log(`Error while trying to change theme: ${e}`)
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
