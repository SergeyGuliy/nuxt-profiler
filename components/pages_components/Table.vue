<template>
  <div id="Table">
    <v-simple-table :dark="$vuetify.theme.dark" :height="table_height">
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
  name: 'Table',
  props: ['table_height']
}
</script>

<style lang="sass">
#Table
  td, th
    width: 20%
    padding: 5px 0
    height: 100%
    text-align: center
    border-bottom: none
</style>
