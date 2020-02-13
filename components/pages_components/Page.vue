<template>
  <v-card hover>
    <v-card-title class="headline">
      <slot name="head">ERROR!!!!</slot>
    </v-card-title>
    <v-divider />
    <v-card-subtitle>
      <slot name="body">ERROR!!!!</slot>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'BodyCard'
}
</script>

<style scoped lang="sass">
.v-card
  min-height: 100% !important
  min-width: 100%
  .v-card__title
    padding: 16px 10px
  .v-card__subtitle
    padding: 16px 10px
    min-height: 100% !important
</style>
