<template>
  <v-btn @click="action(item)" :color="color" icon>
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'TableIcon',
  props: { color: String, icon: String, item: String, action: Function }
}
</script>
