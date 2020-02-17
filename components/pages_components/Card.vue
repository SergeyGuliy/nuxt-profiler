<template>
  <v-card :dark="$vuetify.theme.dark" id="Card">
    <v-card-subtitle>
      <slot></slot>
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
    padding: 16px 15px
</style>
