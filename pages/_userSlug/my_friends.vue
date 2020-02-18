<template>
  <Page id="myFriends">
    <template #head>
      <PageHeader>
        <template #title>List of my Friends</template>
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
              <tr v-for="item in myList" :key="item.id">
                <td>{{ item.profile }}</td>
                <td>{{ item.lists.repositories.length }}</td>
                <td>{{ item.lists.articles.length }}</td>
                <td>{{ item.lists.friends.length }}</td>
                <td>
                  <v-btn
                    @click="$router.push(`/articles/${item.id}`)"
                    icon
                    color="green"
                    ><v-icon>mdi-book</v-icon></v-btn
                  >
                  <v-btn @click="deleteFromMyList(item.id)" icon color="warning"
                    ><v-icon>mdi-minus-circle</v-icon></v-btn
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
  head: {
    title: `Profiler - User Friends`
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

<style lang="sass">
#myFriends
  td, th
    text-align: center
</style>
