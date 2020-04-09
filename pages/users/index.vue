<template>
  <Page id="allUsers">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            list.length > 0 ? 'List of all Users' : 'There is no users in base'
          }}
        </template>
        <template v-if="list.length > 0" #actions>
          <v-select
            v-model="pageSize"
            :items="[5, 10, 15]"
            label="Page size"
            style="max-width: 43px;"
          />
          <v-text-field v-model="searchKey" label="Search" clearable />
        </template>
      </PageHeader>
    </template>
    <template v-if="list.length > 0" #body>
      <PageBody col="1">
        <template #c-1>
          <Table
            v-if="listFiltered.length > 0"
            :headers="['Name', 'Repositories', 'Articles', 'Friends']"
          >
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
                <td v-if="loggedIn">
                  <TableIcon
                    v-if="!$store.getters['friends/friends'].includes(item.id)"
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
import { mapGetters } from 'vuex'
import { controlFriends } from '../../mixins/controlFriends'
import { fetchAllUsers } from '~/functions/users'
import { paginationMixin } from '~/mixins/paginationMixin'
export default {
  name: 'Index',
  mixins: [controlFriends, paginationMixin],
  transition: 'bounce',
  async asyncData({ error }) {
    try {
      return {
        allUsers: await fetchAllUsers()
      }
    } catch (e) {
      error({ message: 'Cannot fetch Users list' })
    }
  },
  data() {
    return {
      searchKey: null,
      pageSize: 10
    }
  },
  computed: {
    ...mapGetters(['id', 'loggedIn']),
    list() {
      const list = []
      Object.keys(this.allUsers).forEach((i) => {
        try {
          const usr = this.allUsers[i]
          if (this.loggedIn && usr.id === this.id) {
            return
          }
          list.push(usr)
        } catch (e) {
          // it's ok. i muted catching.
          // i decide to do this because i am creating filtered array based on allUsers.
          // and if user id will not be exists in allUsers it will not be added to filtered list.
        }
      })
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
  head: {
    title: `Profiler - All Users`
  }
}
</script>
