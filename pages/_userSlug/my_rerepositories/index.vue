<template>
  <div>
    <h1>THIS IS MY REPOS LIST OF USER {{ $route.params.userSlug }}</h1>
    <nuxt-link append to="create">CREATE</nuxt-link>
    <ol>
      <li v-for="rep of myRepositories">
        <span
          @click="$router.push(`/articles/${rep.id}`)"
          @click.middle="deleteFromMyRepositories(rep.id)"
          >{{ rep.id }}</span
        >
        <span>{{ rep.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
// import firebase from 'firebase'
import { fetchAllRepositories } from '~/functions/repositories'
export default {
  name: 'MyRepositories',
  computed: {
    myRepositories() {
      const myRepositoriesIDS = this.$store.getters.user.lists.repositories
      const myRepositories = []
      for (const i of myRepositoriesIDS) {
        try {
          const rep = this.allRepositories[i]
          rep.id = i
          myRepositories.push(rep)
        } catch (e) {
          continue
        }
      }
      return myRepositories
    }
  },
  async asyncData() {
    return {
      allRepositories: await fetchAllRepositories()
    }
  },
  methods: {
    deleteFromMyRepositories(id) {
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
