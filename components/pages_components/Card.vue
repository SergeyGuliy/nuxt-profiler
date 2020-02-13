<template>
  <v-card :dark="$vuetify.theme.dark">
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

<style scoped lang="sass">
.v-card__subtitle
  padding: 16px 5px
</style>
