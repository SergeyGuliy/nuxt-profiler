<template>
  <Page id="listTables">
    <template #head>
      <PageHeader>
        <template #title>{{ headerText }}</template>
        <template v-if="checkedList.length > 0" #actions>
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
    <template v-if="checkedList.length > 0" #body>
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
                <td
                  v-if="
                    $store.getters.loggedIn && item.id !== $store.getters.id
                  "
                >
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
import { controlFriends } from '../../../mixins/controlFriends'
import { fetchAllUsers, fetchUserByID } from '~/functions/users'
import { paginationMixin } from '~/mixins/paginationMixin'

/**
 * ---(users/_id/friends.vue)--- Basic view of user's friends. If user logged in, he can add or remove friend to his list
 * @module pages/users/_id/friends
 *
 * @vue-event {Object(app, store, error)} asyncData - Return ['fetchUserByID']{@link external:functions_users}, ['fetchAllUsers']{@link external:functions_users}, ['fetchAllRepositories']{@link external:functions_repositories}, ['fetchAllArticles']{@link external:functions_articles}, else if user have gitApi will be fetch GitHub info of user.
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. From mixin: [controlFriends.js]{@link external:mixins_controlFriends}
 * @vue-event {id(string)} addTomMyList       - add to my list. From mixin: [controlFriends.js]{@link external:mixins_controlFriends}
 * @vue-data {string} searchKey               - Search field by name
 * @vue-data {Number} pageSize                - Count of items on page
 * @vue-computed {Array} checkedList          - Returns list of all fetched user friends.
 * @vue-computed {Array} listFiltered         - Returns list of all filtered 'checkedList'
 * @vue-computed {Array} listPaginated        - Returns list of all 'listFiltered', chunked on pages. From: [paginationMixin.js]{@link external:mixins_paginationMixin}

 */
export default {
  name: 'Friends',
  mixins: [controlFriends, paginationMixin],
  async asyncData({ route, error }) {
    try {
      return {
        userData: await fetchUserByID(route.params.id),
        allUsers: await fetchAllUsers()
      }
    } catch (e) {
      error({ message: "Can't fetch your data." })
    }
  },
  data() {
    return {
      searchKey: null,
      pageSize: 10
    }
  },
  computed: {
    headerText() {
      return this.checkedList.length > 0
        ? `${this.userName} friends`
        : `${this.userName} don't have friends`
    },
    userName() {
      return this.userData.userInfo.info.first_name &&
        this.userData.userInfo.info.last_name
        ? `${this.userData.userInfo.info.first_name} ${this.userData.userInfo.info.last_name}`
        : `${this.userData.profile}`
    },
    checkedList() {
      const checkedList = []
      this.userData.lists.friends.forEach((i) => {
        try {
          const usr = this.allUsers[i]
          usr.id = i
          checkedList.push(usr)
        } catch (e) {
          // it's ok. i muted catching.
          // i decide to do this because i am creating filtered array based on allUsers.
          // and if user id will not be exists in allUsers it will not be added to filtered list.
        }
      })
      return checkedList
    },
    listFiltered() {
      if (this.searchKey) {
        return this.checkedList.filter((value) => {
          return value.profile
            .toLowerCase()
            .includes(this.searchKey.toLowerCase())
        })
      } else {
        return this.checkedList
      }
    }
  },
  head: {
    title: `Profiler - User Friends`
  }
}
</script>

<style lang="sass">
@import '~/assets/pages_styles/listTables.sass'
</style>
