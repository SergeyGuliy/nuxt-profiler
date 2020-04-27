<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Empty',
  mounted() {
    this.$cookies.remove('access_token')
  }
}
</script>
