<template>
  <Page id="listTables">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            myList.length > 0 ? 'List of my Friends' : "You don't have friends"
          }}
        </template>
        <template v-if="myList.length > 0" #actions>
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
    <template v-if="myList.length > 0" #body>
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
                <td>
                  <TableIcon
                    :item="item.id"
                    :action="deleteFromMyList"
                    color="red"
                    icon="mdi-minus-circle"
                    class="btn_rm"
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
import { controlFriends } from '../../../mixins/controlFriends'
import { fetchAllUsers } from '~/functions/users'
import { paginationMixin } from '~/mixins/paginationMixin'

/**
 * ---(_userSlug/index.vue)--- List of logged in user friends
 * @module pages/_userSlug/my_friends
 *
 * @vue-data {string} searchKey               - Search field by name
 * @vue-data {Number} pageSize                - Count of items on page
 * @vue-event {context(error)} asyncData      - Return ['fetchAllUsers']{@link external:functions_users}
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. From mixin: [controlFriends.js]{@link external:mixins_controlFriends}
 * @vue-computed {Array} myList               - Returns list of all user's friends
 * @vue-computed {Array} listFiltered         - Returns list of all user's filtered 'myList'
 * @vue-computed {Array} listPaginated        - Returns list of all user's 'listFiltered' chunked on pages. From: [paginationMixin.js]{@link external:mixins_paginationMixin}
 */
export default {
  name: 'MyFriends',
  mixins: [controlFriends, paginationMixin],
  async asyncData({ error }) {
    try {
      return {
        allUsers: await fetchAllUsers()
      }
    } catch (e) {
      error({ message: "Can't fetch my followings list." })
    }
  },
  data() {
    return {
      searchKey: null,
      pageSize: 10,
      // ---------------------------Created for testing--------------------------------------------
      allUsers: []
      // ---------------------------Created for testing--------------------------------------------
    }
  },
  computed: {
    myList() {
      const myList = []
      this.$store.getters['friends/friends'].forEach((i) => {
        try {
          const usr = this.allUsers[i]
          usr.id = i
          myList.push(usr)
        } catch (e) {
          // it's ok. i muted catching.
          // i decide to do this because i am creating filtered array based on allUsers.
          // and if user id will not be exists in allUsers it will not be added to filtered list.
        }
      })
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
  head: {
    title: `Profiler - My Friends`
  }
}
</script>

<style lang="sass">
@import '~/assets/pages_styles/listTables.sass'
</style>
