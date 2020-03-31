<template>
  <client-only>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-subheader class="mt-4 grey--text text--darken-1">
          Lists:
        </v-subheader>
        <SideLink link="/users">
          All users
        </SideLink>
        <SideLink link="/repositories">
          All repositories
        </SideLink>
        <SideLink link="/articles">
          All articles
        </SideLink>
        <div v-if="$store.getters.user">
          <v-subheader class="mt-4 grey--text text--darken-1">
            User Panel
          </v-subheader>
          <SideLink :link="`/${$store.getters.user.profile}/edit_profile`">
            Edit profile
          </SideLink>
          <SideLink
            :link="`/${$store.getters.user.profile}/admin_panel`"
            v-if="$store.getters.user.isAdmin"
          >
            Admin panel
          </SideLink>
          <SideLink :link="`/${$store.getters.user.profile}/my_friends`">
            My friends
          </SideLink>
          <SideLink :link="`/${$store.getters.user.profile}/my_repositories`">
            My repositories
          </SideLink>
          <SideLink :link="`/${$store.getters.user.profile}/my_articles`">
            My articles
          </SideLink>
          <SideLink :link="`/${$store.getters.user.profile}/my_portfolio`">
            My portfolio
          </SideLink>
        </div>
      </v-list>
    </v-navigation-drawer>
  </client-only>
</template>

<script>
export default {
  name: 'Sidebar',
  props: { sidebarStatus: Boolean },
  data: () => ({
    drawer: false
  }),
  watch: {
    sidebarStatus(val) {
      this.drawer = val
    }
  }
}
</script>
