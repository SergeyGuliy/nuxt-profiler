<template>
  <v-btn @click="$router.push(link)" class="TableLink" text>
    {{ text }}
    <v-icon color="green">{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'TableLink',
  props: { link: String, icon: String, text: String }
}
</script>

<style lang="sass">
#Table .TableLink
  padding: 0 5px
  min-width: 90%
  text-transform: none
  span
    @media screen and (max-width: 700px)
      font-size: 12px
      letter-spacing: 0.1px
    @media screen and (max-width: 510px)
      font-size: 9px
      letter-spacing: 0.1px
    @media screen and (max-width: 450px)
      font-size: 7.5px
      letter-spacing: 0.1px
</style>
