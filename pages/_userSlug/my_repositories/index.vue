<template>
  <div>
    <h1>THIS IS MY REPOS LIST OF USER {{ $route.params.userSlug }}</h1>
    <nuxt-link append to="create">CREATE</nuxt-link>
    <ol>
      <li v-for="rep of myList">
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
import { fetchAllRepositories } from '~/functions/repositories'
export default {
  name: 'MyRepositories',
  computed: {
    myList() {
      const myListIDS = this.$store.getters.user.lists.repositories
      const myList = []
      for (const i of myListIDS) {
        try {
          const rep = this.allRepositories[i]
          rep.id = i
          myList.push(rep)
        } catch (e) {
          continue
        }
      }
      return myList
    }
  },
  head: {
    title: `Profiler - User Repositories`
  },
  async asyncData() {
    return {
      allRepositories: await fetchAllRepositories()
    }
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteRepository', id)
        this.$store.dispatch('updateUserInfo')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped></style>
