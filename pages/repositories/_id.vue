<template>
  <h1>this is repository #{{ $route.params.id }}</h1>
</template>

<script>
export default {
  name: 'Id',
  transition: 'bounce',
  head: {
    title: `Profiler - Repository Information`
  }
}
</script>

<style scoped></style>
