<template>
  <v-btn :href="link" link target="_blank" color="blue" small outlined>
    {{ text ? text : 'open' }}
    <v-icon dense class="mx-1">{{ icon ? icon : 'mdi-web' }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BtnOpenBlank',
  props: ['link', 'text', 'icon']
}
</script>
