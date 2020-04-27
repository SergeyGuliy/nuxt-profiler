<template>
  <v-app id="inspire">
    <client-only>
      <Navbar @sidebar-toogle="sidebarStatus = !sidebarStatus" />
      <Sidebar
        v-if="$vuetify.breakpoint.xsOnly"
        :sidebar-status="sidebarStatus"
      />
    </client-only>

    <Body>
      <nuxt />
    </Body>
  </v-app>
</template>

<script>
import Navbar from '../components/layout_components/Navbar'
import Sidebar from '../components/layout_components/Sidebar'
import Body from '../components/layout_components/Body'
export default {
  name: 'Default',
  components: { Navbar, Sidebar, Body },
  data() {
    return {
      sidebarStatus: false
    }
  },
  transition: 'bounce',
  created() {
    if (this.$store.getters.loggedIn) {
      this.$vuetify.theme.dark = this.$store.getters.themeDark
    } else {
      this.$vuetify.theme.dark = true
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/tooltip.scss'
</style>
