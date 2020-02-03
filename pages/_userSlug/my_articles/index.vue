<template>
  <div>
    <h1>THIS IS MY ARTICLES LIST OF USER {{ $route.params.userSlug }}</h1>
    <nuxt-link append to="create">CREATE</nuxt-link>
    <ol>
      <li v-for="(item, index) in articles">
        <span @click="$router.push(`/articles/${index}`)">{{ index }}</span>
        <span>{{ item.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import { fetchAllArticles } from '~/functions/articles'
export default {
  name: 'MyArticles',
  async asyncData() {
    return {
      articles: await fetchAllArticles()
    }
  }
}
</script>

<style scoped></style>
