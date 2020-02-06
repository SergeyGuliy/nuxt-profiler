<template>
  <h1>THIS IS ADMIN OF USER {{ $route.params.userSlug }}</h1>
</template>

<script>
export default {
  name: 'MyAdminPanel',
  head: {
    title: `Profiler - Admin Panel`
  }
}
</script>

<style scoped></style>
