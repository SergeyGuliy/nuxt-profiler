<template>
  <v-chip v-if="text" class="TableText" small label>
    {{ text }}
  </v-chip>
</template>

<script>
export default {
  name: 'TableText',
  props: { text: String }
}
</script>

<style lang="sass">
#Table .TableText
  padding: 0 3px
  font-size: 14px
  letter-spacing: 0.1px
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
