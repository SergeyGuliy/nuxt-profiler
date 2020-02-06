<template>
  <div>
    <h1>ALL USERS</h1>
    <ol>
      <li v-for="usr of list">
        <span @click="$router.push(`/users/${usr.id}`)">{{ usr.id }}</span>
        <span>{{ usr.name }}</span>
        <button
          v-if="!$store.getters.user.lists.friends.includes(usr.id)"
          @click="addTomMyList(usr.id)"
        >
          ADD
        </button>
        <button v-else @click="deleteFromMyList(usr.id)">REMOVE</button>
      </li>
    </ol>
  </div>
</template>

<script>
import { fetchAllUsers } from '~/functions/users'
export default {
  name: 'Index',
  computed: {
    list() {
      const list = []
      for (const i in this.allUsers) {
        try {
          const usr = this.allUsers[i]
          usr.id = i
          list.push(usr)
        } catch (e) {
          continue
        }
      }
      return list
    }
  },
  async asyncData() {
    return {
      allUsers: await fetchAllUsers()
    }
  },
  head: {
    title: `Profiler - All Users`
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteFriend', id)
        this.$store.dispatch('updateUserInfo')
      } catch (e) {
        console.log(e)
      }
    },
    addTomMyList(id) {
      try {
        this.$store.commit('pushFriend', id)
        this.$store.dispatch('updateUserInfo')
      } catch (e) {
        console.log(e)
      }
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
