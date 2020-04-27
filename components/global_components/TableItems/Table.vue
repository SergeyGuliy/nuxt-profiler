<template>
  <div id="Table">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
            <th v-if="loggedIn">Actions</th>
          </tr>
        </thead>
        <tbody>
          <slot name="table-body" />
        </tbody>
      </template>
    </v-simple-table>

    <client-only>
      <slot name="table-pagination" />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: { headers: Array },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style lang="sass">
#Table
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-between
  td, th
    width: 23%
    padding: 5px 0
    height: 100%
    text-align: center
  .theme--light tr:hover
    background-color: #ffffff
  .theme--dark tr:hover
    background-color: #1e1e1e
</style>
