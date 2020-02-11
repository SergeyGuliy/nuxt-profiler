<template>
  <Page>
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
                <th>Creator</th>
                <th>Actions</th>
              </tr>
            </template>
            <template #table-body>
              <tr v-for="item in myList" :key="item.id">
                <td>{{ item.name }}</td>
                <td>
                  <v-btn @click="$router.push(`/users/${item.id}`)"
                    >{{ item.creatorName }}
                    <v-icon>mdi-face-profile</v-icon></v-btn
                  >
                </td>
                <td>
                  <v-btn
                    @click="$router.push(`/articles/${item.id}`)"
                    icon
                    color="secondary"
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

<style scoped lang="sass">
.v-data-table__wrapper tr > td > button.v-btn
  padding: 0 5px
  height: 27px
td, th
  text-align: center !important
</style>
