<template>
  <Page id="userFriends">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            myList.length > 0
              ? `${userName} friends`
              : `${userName} don't have friends`
          }}
        </template>
        <template #actions v-if="myList.length > 0">
          <v-select
            :items="[5, 10, 15]"
            v-model="pageSize"
            label="Page size"
            outlined
            dense
            style="max-width: 56px;"
          />
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
              <tr v-for="item in listPaginated[pageCurrent - 1]" :key="item.id">
                <td>
                  <TableLink :link="`/users/${item.id}`" :text="item.profile" />
                </td>
                <td>
                  <TableText :text="`${item.lists.repositories.length - 1}`" />
                </td>
                <td>
                  <TableText :text="`${item.lists.articles.length - 1}`" />
                </td>
                <td>
                  <TableText :text="`${item.lists.friends.length - 1}`" />
                </td>
                <td v-if="item.id !== $store.getters.user.id">
                  <TableIcon
                    v-if="!$store.getters.user.lists.friends.includes(item.id)"
                    :item="item.id"
                    :action="addTomMyList"
                    color="green"
                    icon="mdi-plus-circle"
                  />
                  <TableIcon
                    v-else
                    :item="item.id"
                    :action="deleteFromMyList"
                    color="red"
                    icon="mdi-minus-circle"
                  />
                </td>
              </tr>
            </template>
            <template #table-pagination>
              <v-pagination
                v-model="pageCurrent"
                :length="listPaginated.length"
              />
            </template>
          </Table>
          <Card v-else>Поиск не дал результата</Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchAllUsers, fetchUserByID } from '~/functions/users'
import { paginationMixin } from '~/mixins/paginationMixin'

export default {
  name: 'Friends',
  mixins: [paginationMixin],
  data() {
    return {
      searchKey: null,
      pageSize: 10
    }
  },
  computed: {
    userName() {
      if (
        this.userData.userInfo.info.first_name &&
        this.userData.userInfo.info.last_name
      ) {
        return `${this.userData.userInfo.info.first_name} ${this.userData.userInfo.info.last_name}`
      } else {
        return `${this.userData.profile}`
      }
    },
    myList() {
      const myListIDS = this.userData.lists.friends
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
  async asyncData({ route }) {
    try {
      return {
        userData: await fetchUserByID(route.params.id),
        allUsers: await fetchAllUsers()
      }
    } catch (e) {}
  },
  head: {
    title: `Profiler - User Friends`
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteFriend', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.error(`You delete friend`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
    },
    addTomMyList(id) {
      try {
        this.$store.commit('pushFriend', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.success(`You add friend`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
    }
  }
}
</script>
