<template>
  <Page id="allUsers">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            list.length > 0 ? 'List of all Users' : 'There is no users in base'
          }}
        </template>
        <template #actions v-if="list.length > 0">
          <v-select
            :items="[5, 10, 15]"
            v-model="pageSize"
            label="Page size"
            style="max-width: 43px;"
          />
          <v-text-field v-model="searchKey" label="Search" clearable />
        </template>
      </PageHeader>
    </template>
    <template #body v-if="list.length > 0">
      <PageBody col="1">
        <template #c-1>
          <Table v-if="listFiltered.length > 0">
            <template #table-head>
              <tr>
                <th>Name</th>
                <th>Repositories</th>
                <th>Articles</th>
                <th>Friends</th>
                <th v-if="$store.getters.user">Actions</th>
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
                <td v-if="$store.getters.user">
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
import { fetchAllUsers } from '~/functions/users'
import { paginationMixin } from '~/mixins/paginationMixin'
export default {
  name: 'Index',
  mixins: [paginationMixin],
  transition: 'bounce',
  data() {
    return {
      searchKey: null,
      pageSize: 10
    }
  },
  computed: {
    list() {
      const list = []
      for (const i in this.allUsers) {
        try {
          const usr = this.allUsers[i]
          console.log(Boolean(this.$store.getters.user))
          if (this.$store.getters.user) {
            if (usr.id === this.$store.getters.user.id) {
              continue
            }
            usr.id = i
            list.push(usr)
          } else {
            usr.id = i
            list.push(usr)
          }
        } catch (e) {
          continue
        }
      }
      return list
    },
    listFiltered() {
      if (this.searchKey) {
        return this.list.filter((value) => {
          return value.profile
            .toLowerCase()
            .includes(this.searchKey.toLowerCase())
        })
      } else {
        return this.list
      }
    }
  },
  async asyncData({ error }) {
    try {
      return {
        allUsers: await fetchAllUsers()
      }
    } catch (e) {
      error({ message: 'Cannot fetch Users list' })
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
    },
    print() {
      const printContents = document.getElementById('PageBody').innerHTML
      const originalContents = document.body.innerHTML

      document.body.innerHTML = printContents

      window.print()

      document.body.innerHTML = originalContents
    }
  }
}
</script>
