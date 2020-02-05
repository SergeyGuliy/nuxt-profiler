<template>
  <div>
    <h1>THIS IS MY ARTICLES LIST OF USER {{ $route.params.userSlug }}</h1>
    <ol>
      <li v-for="usr of myList">
        <span
          @click="$router.push(`/users/${usr.id}`)"
          @click.middle="deleteFromMyList(usr.id)"
          >{{ usr.id }}</span
        >
        <span>{{ usr.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import { fetchAllUsers } from '~/functions/users'
export default {
  name: 'MyFriends',
  computed: {
    myList() {
      const myListIDS = this.$store.getters.user.lists.friends
      const myList = []
      for (const i of myListIDS) {
        try {
          const usr = this.allUsers[i]
          usr.id = i
          myList.push(usr)
        } catch (e) {
          continue
        }
      }
      return myList
    }
  },
  async asyncData() {
    return {
      allUsers: await fetchAllUsers()
    }
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteFriend', id)
        this.$store.dispatch('updateUserInfo')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped></style>
