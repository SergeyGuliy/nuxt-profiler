<template>
  <v-card class="Page">
    <v-card-title class="headline">
      <slot name="head" />
    </v-card-title>
    <v-divider />
    <v-card-subtitle class="print">
      <slot name="body" />
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'Page'
}
</script>

<style lang="sass">
.Page.v-card
  height: 100%
  min-width: 100%
  display: flex
  flex-direction: column
  .v-card__title
    padding: 10px
    flex: 0 1 auto
    @media print
      padding-top: 8px
      padding-bottom: 12px
  .v-card__subtitle
    padding: 10px
    flex: 1 1 auto
  .print
    @media print
      padding: 11px
</style>
