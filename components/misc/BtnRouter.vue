<template>
  <v-btn @click="$router.push(link)" link color="blue" small outlined>
    {{ text ? text : 'open' }}
    <v-icon dense class="mx-1">{{ icon ? icon : 'mdi-chevron-right' }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnRouter',
  props: ['link', 'text', 'icon']
}
</script>
