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
import firebase from 'firebase'
import Navbar from '../components/main/Navbar'
// import Sidebar from '../components/main/Sidebar'
import Body from '../components/main/Body'
export default {
  components: { Navbar, Body },
  // components: { Navbar, Sidebar, Body },
  data() {
    return {
      sidebarStatus: false
    }
  },
  async mounted() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await (await firebase.auth().currentUser).uid
        this.$cookies.set('access_token', token)
      } else {
        this.$cookies.remove('access_token')
      }
    })
  }
}
</script>

<style scoped lang="sass"></style>
