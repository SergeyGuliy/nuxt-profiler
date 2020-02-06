<template>
  <div>
    <h1>THIS IS MY ARTICLES LIST OF USER {{ $route.params.userSlug }}</h1>
    <nuxt-link append to="create">CREATE</nuxt-link>
    <ol>
      <li v-for="art of myList">
        <span
          @click="$router.push(`/articles/${art.id}`)"
          @click.middle="deleteFromMyList(art.id)"
          >{{ art.id }}</span
        >
        <span>{{ art.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import { fetchAllArticles } from '~/functions/articles'
export default {
  name: 'MyArticles',
  computed: {
    myList() {
      const myListIDS = this.$store.getters.user.lists.articles
      const myList = []
      for (const i of myListIDS) {
        try {
          const art = this.allArticles[i]
          art.id = i
          myList.push(art)
        } catch (e) {
          continue
        }
      }
      return myList
    }
  },
  head: {
    title: `Profiler - User Articles`
  },
  async asyncData() {
    return {
      allArticles: await fetchAllArticles()
    }
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteArticle', id)
        this.$store.dispatch('updateUserInfo')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped></style>
