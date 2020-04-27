<template>
  <v-btn class="BtnCreate" color="green" fab small @click="$router.push(link)">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnCreate',
  props: { link: String }
}
</script>

<style lang="sass">
.BtnCreate
  position: fixed
  bottom: 5px
  right: 5px
  z-index: 1000
</style>
