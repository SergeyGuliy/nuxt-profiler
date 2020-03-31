<template>
  <v-app id="inspire">
    <Navbar @sidebar-toogle="sidebarStatus = !sidebarStatus" />
    <Sidebar :sidebarStatus="sidebarStatus" v-if="$vuetify.breakpoint.xsOnly" />
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
  components: { Navbar, Sidebar, Body },
  data() {
    return {
      sidebarStatus: false
    }
  },
  transition: 'bounce',
  created() {
    if (this.$store.getters.user) {
      this.$vuetify.theme.dark = this.$store.getters.user.themeDark
    } else {
      this.$vuetify.theme.dark = true
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/styles.sass'
@import '~/assets/tooltip.scss'
</style>
