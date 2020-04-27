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
          <v-select
            v-model="language"
            :items="Object.keys(languages)"
            label="Language"
            clearable
          >
          </v-select>
          <v-select
            v-model="technology"
            :items="technologies"
            label="Technology"
            clearable
          >
          </v-select>
          <v-text-field v-model="searchKey" label="Search" clearable />
        </template>
      </PageHeader>
    </template>
    <template v-if="checkedList.length > 0" #body>
      <PageBody col="1">
        <template #c-1>
          <Table
            v-if="listFiltered.length > 0"
            :headers="['Name', 'Creator', 'Language', 'Technology']"
          >
            <template #table-body>
              <tr v-for="item in listPaginated[pageCurrent - 1]" :key="item.id">
                <td>
                  <TableLink :link="`/articles/${item.id}`" :text="item.name" />
                </td>
                <td>
                  <TableLink
                    :link="`/users/${item.creatorId}`"
                    :text="item.creatorName"
                  />
                </td>
                <td>
                  <TableText :text="item.language" />
                </td>
                <td>
                  <TableText :text="item.technology" />
                </td>
                <td v-if="item.isPublic && $store.getters.loggedIn">
                  <TableIcon
                    v-if="
                      !$store.getters['articles/articles'].includes(item.id)
                    "
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
import { filterMixin } from '~/mixins/filterMixin'
import { controlArticles } from '~/mixins/controlArticles'
import { paginationMixin } from '~/mixins/paginationMixin'
import { fetchCategories } from '~/functions/language-technologies'
import { fetchAllArticles } from '~/functions/articles'
import { fetchUserByID } from '~/functions/users'

/**
 * ---(users/_id/articles.vue)--- Basic view of user's articles. If user logged in, he can add or remove friend to his list
 * @module pages/users/_id/articles
 *
 * @vue-event {Object(app, store, error)} asyncData - Return ['fetchUserByID']{@link external:functions_users}, ['fetchAllUsers']{@link external:functions_users}, ['fetchAllRepositories']{@link external:functions_repositories}, ['fetchAllArticles']{@link external:functions_articles}, else if user have gitApi will be fetch GitHub info of user.
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. From mixin: [controlFriends.js]{@link external:mixins_controlFriends}
 * @vue-event {id(string)} addTomMyList       - add to my list. From mixin: [controlFriends.js]{@link external:mixins_controlFriends}
 * @vue-computed {Array} checkedList          - Returns list of all fetched user articles.
 * @vue-computed {Array} listFiltered         - Returns list of all filtered 'checkedList'. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-computed {Array} listPaginated        - Returns list of all 'listFiltered', chunked on pages. From: [paginationMixin.js]{@link external:mixins_paginationMixin}
 * @vue-data {string} searchKey               - Search field by name. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {string} language                - Search field by language. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {string} technology              - Search field by technology. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {Number} pageSize                - Count of items on page
 */
export default {
  name: 'Articles',
  mixins: [controlArticles, filterMixin, paginationMixin],
  async asyncData({ route, error }) {
    try {
      return {
        userData: await fetchUserByID(route.params.id),
        basicList: await fetchAllArticles(),
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: "Can't fetch user articles." })
    }
  },
  data() {
    return {
      // ---------------------------Created for testing--------------------------------------------
      userData: {},
      basicList: {},
      // ---------------------------Created for testing--------------------------------------------
      pageSize: 10
    }
  },
  computed: {
    headerText() {
      return this.checkedList.length > 0
        ? `${this.userName} articles`
        : `${this.userName} don't have articles`
    },
    userName() {
      return this.userData.userInfo.info.first_name &&
        this.userData.userInfo.info.last_name
        ? `${this.userData.userInfo.info.first_name} ${this.userData.userInfo.info.last_name}`
        : `${this.userData.profile}`
    },
    checkedList() {
      const myListIDS = this.userData.lists.articles
      const myList = []
      for (const i of myListIDS) {
        try {
          const art = this.basicList[i]
          art.id = i
          myList.push(art)
        } catch (e) {
          continue
        }
      }
      return myList
    }
  },
  head: {
    title: `Profiler - User Articles`
  }
}
</script>

<style lang="sass">
@import '~/assets/pages_styles/listTables.sass'
</style>
