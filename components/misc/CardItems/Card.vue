<template>
  <v-card id="Card" :dark="$vuetify.theme.dark">
    <slot />
  </v-card>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style lang="sass">
#Card
  padding: 16px 20px
  min-height: 100%
  @media print
    padding: 0 5px
</style>
