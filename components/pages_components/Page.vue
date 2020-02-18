<template>
  <v-card hover class="Page">
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

<style lang="sass">
.Page.v-card
  min-height: 100%
  min-width: 100%
  .v-card__title
    padding: 16px 5px
  .v-card__subtitle
    padding: 16px 5px
    min-height: 100%
</style>
