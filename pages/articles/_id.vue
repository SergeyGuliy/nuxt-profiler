<template>
  <h1>this is article #{{ $route.params.id }}</h1>
</template>

<script>
import { fetchArticleByID } from '~/functions/articles'
export default {
  name: 'Id',
  async asyncData(route) {
    return {
      data: await fetchArticleByID(route.params.id)
    }
  },
  head: {
    title: `Profiler - Article Information`
  }
}
</script>

<style scoped></style>
