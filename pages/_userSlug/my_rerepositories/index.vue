<template>
  <div>
    <h1>THIS IS MY REPOS LIST OF USER {{ $route.params.userSlug }}</h1>
    <nuxt-link append to="create">CREATE</nuxt-link>
    <ol>
      <li v-for="rep of repositories">
        <span @click="$router.push(`/articles/${rep.id}`)">{{ rep.id }}</span>
        <span>{{ rep.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import { fetchAllRepositories } from '~/functions/repositories'
export default {
  name: 'MyRepositories',
  async asyncData({ store }) {
    const allRepositories = await fetchAllRepositories()
    console.log(store.getters.user)
    const myRepositoriesIDS = store.getters.user.lists.repositories
    const myRepositories = []
    for (const i of myRepositoriesIDS) {
      try {
        const rep = allRepositories[i]
        rep.id = i
        myRepositories.push(rep)
      } catch (e) {
        continue
      }
    }
    return {
      repositories: myRepositories
    }
  },
  async fetch({ store }) {
    await store.dispatch('fetchUserInfo')
  }
}
</script>

<style scoped></style>
