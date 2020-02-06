<template>
  <div>
    <h1>ALL ARTICLES</h1>
    <ol>
      <li v-for="rep of publicList">
        <span
          @click="$router.push(`/articles/${rep.id}`)"
          @click.middle="deleteFromMyList(rep.id)"
          >{{ rep.id }}</span
        >
        <span>{{ rep.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import { fetchAllArticles, fetchPublicArticlesIDS } from '~/functions/articles'
export default {
  name: 'Index',
  computed: {
    publicList() {
      const publicListList = []
      for (const i of this.publicArticlesIDS) {
        try {
          const art = this.allArticles[i]
          art.id = i
          publicListList.push(art)
        } catch (e) {
          continue
        }
      }
      return publicListList
    }
  },
  head: {
    title: `Profiler - Public Articles`
  },
  async asyncData() {
    return {
      allArticles: await fetchAllArticles(),
      publicArticlesIDS: await fetchPublicArticlesIDS()
    }
  }
}
</script>

<style scoped></style>
