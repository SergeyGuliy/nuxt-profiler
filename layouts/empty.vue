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
  middleware: 'isLoggedIn'
}
</script>
