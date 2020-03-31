<template>
  <v-btn
    @click="$router.push(link)"
    class="BtnRouter"
    link
    color="blue"
    small
    outlined
  >
    {{ text ? text : 'open' }}
    <v-icon dense class="mx-1">{{ icon ? icon : 'mdi-chevron-right' }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnRouter',
  props: { link: String, text: String, icon: String }
}
</script>

<style lang="sass">
.Card .CardRow .BtnRouter
  padding: 0 5px
  letter-spacing: 0.7px
  height: 23px
  @media print
    display: none
</style>
