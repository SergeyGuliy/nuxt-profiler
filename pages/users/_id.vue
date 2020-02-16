<template>
  <h1>this is user #{{ $route.params.id }}</h1>
</template>

<script>
export default {
  name: 'Id',
  transition: 'bounce',
  head: {
    title: `Profiler - User Information`
  }
}
</script>

<style scoped></style>
