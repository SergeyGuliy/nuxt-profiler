<template>
  <div id="Table">
    <v-simple-table :dark="$vuetify.theme.dark">
      <template v-slot:default>
        <thead>
          <slot name="table-head"></slot>
        </thead>
        <tbody>
          <slot name="table-body"></slot>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'Table'
}
</script>

<style lang="sass">
#Table
  td, th
    width: 20%
    padding: 3px
</style>
