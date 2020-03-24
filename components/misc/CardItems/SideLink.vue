<template>
  <v-list-item :to="link" link>
    <v-list-item-content>
      <v-list-item-title>
        <slot />
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'SideLink',
  props: {
    link: String,
    sidebar: Boolean
  }
}
</script>

<style scoped></style>
