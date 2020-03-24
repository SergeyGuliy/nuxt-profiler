<template>
  <v-card class="Page">
    <v-card-title class="headline">
      <slot name="head" class="print">ERROR!!!!</slot>
    </v-card-title>
    <v-divider />
    <v-card-subtitle class="print">
      <slot name="body" />
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
  height: 100%
  min-width: 100%
  display: flex
  flex-direction: column
  .v-card__title
    padding: 16px 10px
    flex: 0 1 auto
  .v-card__subtitle
    padding: 16px 10px
    flex: 1 1 auto
  .print
    @media print
      padding: 1px
</style>
