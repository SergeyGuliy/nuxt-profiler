<template>
  <v-chip id="TableText" v-if="text" small label>
    {{ text }}
  </v-chip>
</template>

<script>
export default {
  name: 'TableText',
  props: ['text']
}
</script>

<style lang="sass">
#TableText
  padding: 0 10px
  font-size: 14px
  letter-spacing: 0.1px
  @media screen and (max-width: 700px)
    font-size: 12px
    letter-spacing: 0.1px
    @media screen and (max-width: 510px)
      font-size: 9px
      letter-spacing: 0.1px
    @media screen and (max-width: 450px)
      font-size: 8.5px
      letter-spacing: 0.1px
</style>
