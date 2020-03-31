<template>
  <v-btn @click="$router.push(link)" class="BtnCreate" color="green" fab small>
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
