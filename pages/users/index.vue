<template>
  <Page id="listTables">
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
                    class="btn_add"
                  />
                  <TableIcon
                    v-else
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
import { mapGetters } from 'vuex'
import { controlFriends } from '../../mixins/controlFriends'
import { fetchAllUsers } from '~/functions/users'
import { paginationMixin } from '~/mixins/paginationMixin'

/**
 * ---(users/index.vue)--- List of all users. If user logged in, he can add or remove friends to his list
 * @module pages/users/index
 *
 * @vue-data {string} searchKey               - Search field by name
 * @vue-data {Number} pageSize                - Count of items on page
 * @vue-event {context(error)} asyncData      - Return ['fetchAllUsers']{@link external:functions_users}
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. From mixin: [controlFriends.js]{@link external:mixins_controlFriends}
 * @vue-event {id(string)} addTomMyList       - add to my list. From mixin: [controlFriends.js]{@link external:mixins_controlFriends}
 * @vue-computed {Array} list                 - Returns list of all user without logged in user
 * @vue-computed {Array} listFiltered         - Returns list of all filtered 'list'
 * @vue-computed {Array} listPaginated        - Returns list of all 'listFiltered'chunked on pages. From: [paginationMixin.js]{@link external:mixins_paginationMixin}
 */
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
  /** @returns {{pageSize: number, searchKey: null}} */
  data() {
    return {
      searchKey: null,
      pageSize: 10,
      // ---------------------------Created for testing--------------------------------------------
      allUsers: {}
      // ---------------------------Created for testing--------------------------------------------
    }
  },
  computed: {
    ...mapGetters(['id', 'loggedIn']),
    /** @returns {Array} */
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
    /** @returns {Array} */
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

<style lang="sass">
@import '~/assets/pages_styles/listTables.sass'
</style>
