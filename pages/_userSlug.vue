<template>
  <nuxt></nuxt>
</template>

<script>
export default {
  name: 'UserSlug',
  transition: 'bounce',
  middleware: 'isNotLoggedIn'
}
</script>

<style scoped></style>
