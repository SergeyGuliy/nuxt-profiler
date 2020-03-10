<template>
  <v-card id="Card" :dark="$vuetify.theme.dark">
    <v-card-subtitle>
      <slot />
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style lang="sass">
#Card
  .v-card__subtitle
    padding: 16px 20px
    min-height: 100%
</style>
