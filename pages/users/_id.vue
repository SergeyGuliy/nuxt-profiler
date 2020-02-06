<template>
  <h1>this is user #{{ $route.params.id }}</h1>
</template>

<script>
export default {
  name: 'Id',
  head: {
    title: `Profiler - User Information`
  }
}
</script>

<style scoped></style>
