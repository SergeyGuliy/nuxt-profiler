<template>
  <v-app id="inspire">
    <Navbar @sidebar-toogle="sidebarStatus = !sidebarStatus" />
    <!--    <Sidebar :status="sidebarStatus" />-->
    <Body>
      <nuxt />
    </Body>
  </v-app>
</template>

<script>
import Navbar from '../components/layout_components/Navbar'
// import Sidebar from '../components/layout_components/Sidebar'
import Body from '../components/layout_components/Body'
export default {
  components: { Navbar, Body },
  // components: { Navbar, Sidebar, Body },
  data() {
    return {
      sidebarStatus: false
    }
  },
  transition: 'bounce',
  middleware: 'isNotLoggedIn'
}
</script>
