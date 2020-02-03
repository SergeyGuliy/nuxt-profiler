<template>
  <div>
    <h1>ALL REPOSITORIES</h1>
    <ol>
      <li v-for="(item, index) in repositories">
        <span @click="$router.push(`/articles/${index}`)">{{ index }}</span>
        <span>{{ item.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import {
  fetchAllRepositories,
  fetchPublicRepositoriesIDS
} from '~/functions/repositories'
export default {
  name: 'Index',
  async asyncData() {
    const allRepositories = await fetchAllRepositories()
    const publicRepositoriesIDS = await fetchPublicRepositoriesIDS()
    const publicRepositories = []
    for (const i of publicRepositoriesIDS) {
      try {
        const rep = allRepositories[i]
        rep.id = i
        publicRepositories.push(rep)
      } catch (e) {
        continue
      }
    }
    return {
      repositories: publicRepositories
    }
  }
}
</script>

<style scoped>
td,
th {
  height: 30px;
  width: 100px;
}
</style>
