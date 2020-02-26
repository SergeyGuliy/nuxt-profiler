<template>
  <v-btn :color="color" icon @click="action(item)">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'TableIcon',
  props: ['color', 'icon', 'item', 'action']
}
</script>
