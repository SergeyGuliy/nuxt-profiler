<template>
  <v-content id="Body">
    <v-container class="fill-height" align-itemst-start fluid>
      <slot />
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Body'
}
</script>

<style lang="sass">
#Body
  @media print
    padding: 0 !important
  .container.fill-height
    align-items: start
    padding: 12px 5px
</style>
