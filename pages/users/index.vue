<template>
  <Page>
    <template #head>
      <PageHeader>
        <template #title>Edit Profile</template>
        <template #actions>
          <v-btn class="mx-1">Save</v-btn>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="1">
        <template #c-1>
          <Table>
            <template #table-head>
              <tr>
                <th>Name</th>
                <th>Repositories</th>
                <th>Articles</th>
                <th>Friends</th>
                <th>Actions</th>
              </tr>
            </template>
            <template #table-body>
              <tr v-for="item in list" :key="item.id">
                <td>{{ item.profile }}</td>
                <td>{{ item.lists.repositories.length }}</td>
                <td>{{ item.lists.articles.length }}</td>
                <td>{{ item.lists.friends.length }}</td>
                <td>
                  <v-btn
                    @click="$router.push(`/users/${item.id}`)"
                    icon
                    color="green"
                    ><v-icon>mdi-face-profile</v-icon></v-btn
                  >
                  <v-btn
                    v-if="!$store.getters.user.lists.friends.includes(item.id)"
                    @click="addTomMyList(item.id)"
                    icon
                    color="info"
                    ><v-icon>mdi-account-multiple-plus</v-icon></v-btn
                  >
                  <v-btn
                    v-else-if="
                      $store.getters.user.lists.friends.includes(item.id)
                    "
                    @click="deleteFromMyList(item.id)"
                    icon
                    color="warning"
                    ><v-icon>mdi-account-multiple-remove</v-icon></v-btn
                  >
                </td>
              </tr>
            </template>
          </Table>
        </template>
      </PageBody>
    </template>
  </Page>
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
          if (usr.id === this.$store.getters.user.id) {
            continue
          }
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
        console.log(id)
        this.$store.commit('pushFriend', id)
        this.$store.dispatch('updateUserInfo')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="sass">
td, th
  text-align: center !important
</style>
