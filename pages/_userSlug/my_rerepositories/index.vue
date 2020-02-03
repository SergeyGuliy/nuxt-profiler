<template>
  <div>
    <h1>THIS IS MY REPOS LIST OF USER {{ $route.params.userSlug }}</h1>
    <nuxt-link append to="create">CREATE</nuxt-link>
    <ol>
      <li v-for="(item, index) in repositories">
        <span @click="$router.push(`/articles/${index}`)">{{ index }}</span>
        <span>{{ item.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import { fetchAllRepositories } from '~/functions/repositories'
export default {
  name: 'MyRepositories',
  async asyncData() {
    return {
      repositories: await fetchAllRepositories()
    }
  }
}
</script>

<style scoped></style>
