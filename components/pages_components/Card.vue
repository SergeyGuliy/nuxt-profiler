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

<style scoped></style>
