<template>
  <div>
    <h1>ALL REPOSITORIES</h1>
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
import {
  fetchAllRepositories,
  fetchPublicRepositoriesIDS
} from '~/functions/repositories'
export default {
  name: 'Index',
  computed: {
    publicList() {
      const publicListList = []
      for (const i of this.publicRepositoriesIDS) {
        try {
          const rep = this.allRepositories[i]
          rep.id = i
          publicListList.push(rep)
        } catch (e) {
          continue
        }
      }
      return publicListList
    }
  },
  head: {
    title: `Profiler - Public Repositories`
  },
  async asyncData() {
    return {
      allRepositories: await fetchAllRepositories(),
      publicRepositoriesIDS: await fetchPublicRepositoriesIDS()
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
