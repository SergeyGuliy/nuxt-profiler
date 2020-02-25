<template>
  <Page id="myFriends">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            myList.length > 0 ? 'List of my Friends' : "You don't have friends"
          }}
        </template>
        <template #actions v-if="myList.length > 0">
          <v-text-field
            v-model="searchKey"
            label="Search"
            outlined
            clearable
            dense
          />
        </template>
      </PageHeader>
    </template>
    <template #body v-if="myList.length > 0">
      <PageBody col="1">
        <template #c-1>
          <Table v-if="listFiltered.length > 0">
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
              <tr v-for="item in listFiltered" :key="item.id">
                <td>
                  <TableLink :link="`/users/${item.id}`" :text="item.profile" />
                </td>
                <td>
                  <TableText :text="item.lists.repositories.length - 1" />
                </td>
                <td>
                  <TableText :text="item.lists.articles.length - 1" />
                </td>
                <td>
                  <TableText :text="item.lists.friends.length - 1" />
                </td>
                <td>
                  <TableIcon
                    :item="item.id"
                    :action="deleteFromMyList"
                    color="warning"
                    icon="mdi-minus-circle"
                  />
                </td>
              </tr>
            </template>
          </Table>
          <Card v-else>Поиск не дал результата</Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchAllUsers } from '~/functions/users'
export default {
  name: 'MyFriends',
  data() {
    return {
      searchKey: null
    }
  },
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
    },
    listFiltered() {
      if (this.searchKey) {
        return this.myList.filter((value) => {
          return value.profile
            .toLowerCase()
            .includes(this.searchKey.toLowerCase())
        })
      } else {
        return this.myList
      }
    }
  },
  async asyncData() {
    try {
      return {
        allUsers: await fetchAllUsers()
      }
    } catch (e) {
      console.log(e)
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
  .v-input
    margin: 2px
    width: 32%
    max-width: 200px
  .v-input__slot
    margin: 0
    padding: 0 7px
  .v-text-field__details
    display: none
  .v-select__selection.v-select__selection--comma, .v-label, .v-text-field__slot
    font-size: 13px
  .v-input__append-inner
    padding: 0
    height: 20px
    width: 20px
    .v-icon
      height: 20px
      width: 20px
</style>
