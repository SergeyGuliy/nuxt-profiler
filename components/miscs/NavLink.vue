<template>
  <v-btn :to="link" text exact-active-class="outlined">
    <span>
      <slot></slot>
    </span>
  </v-btn>
</template>

<script>
export default {
  name: 'NavLink',
  props: {
    link: String
  }
}
</script>

<style scoped></style>
