<template>
  <div>
    <v-simple-table :dark="$vuetify.theme.dark">
      <template v-slot:default class="centered">
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

<style scoped lang="sass">
.v-data-table__wrapper
  height: 100%
  max-height: calc(100vh - 221px)
</style>
