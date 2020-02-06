<template>
  <v-app id="inspire">
    <Navbar @sidebar-toogle="sidebarStatus = !sidebarStatus" />
    <Sidebar :status="sidebarStatus" />
    <v-content>
      <v-container class="fill-height" align-itemst-start>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
export default {
  components: { Navbar, Sidebar },
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

<style scoped lang="sass">
#inspire .container.fill-height
  align-items: start
</style>
