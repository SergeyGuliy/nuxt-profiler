<template>
  <Page id="listTables">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            checkedList.length > 0
              ? 'List of public repositories'
              : 'There is no public repositories'
          }}
        </template>
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
                  <TableLink
                    :link="`/repositories/${item.id}`"
                    :text="item.name"
                  />
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
                <td v-if="$store.getters.loggedIn">
                  <TableIcon
                    v-if="$store.getters.id === item.creatorId"
                    :item="item.id"
                    :action="routerPush"
                    color="orange"
                    icon="mdi-pencil-circle"
                  />
                  <TableIcon
                    v-if="
                      !$store.getters['repositories/repositories'].includes(
                        item.id
                      )
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
import { filterMixin } from '../../mixins/filterMixin'
import { controlRepositories } from '../../mixins/controlRepositories'
import { paginationMixin } from '~/mixins/paginationMixin'
import { fetchAllRepositories } from '~/functions/repositories'
import { fetchCategories } from '~/functions/language-technologies'

/**
 * ---(repositories/index.vue)--- List of all repositories. If user logged in, he can add or remove repositories to his list
 * @module pages/repositories/index
 *
 * @vue-data {string} searchKey               - Search field by name. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {string} language                - Search field by language. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {string} technology              - Search field by technology. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {Number} pageSize                - Count of items on page
 * @vue-event {context(error)} asyncData      - Return ['fetchAllRepositories']{@link external:functions_repositories}. Return ['fetchCategories']{@link external:functions_language_technologies}
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. From mixin: [controlRepositories.js]{@link external:mixins_controlRepositories}
 * @vue-event {id(string)} addTomMyList       - add to my list. From mixin: [controlRepositories.js]{@link external:mixins_controlRepositories}
 * @vue-computed {Array} checkedList          - Returns list of all valid repositories.
 * @vue-computed {Array} listFiltered         - Returns list of all filtered 'checkedList'. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-computed {Array} listPaginated        - Returns list of all 'listFiltered', chunked on pages. From: [paginationMixin.js]{@link external:mixins_paginationMixin}
 */
export default {
  name: 'Index',
  mixins: [controlRepositories, filterMixin, paginationMixin],
  transition: 'bounce',
  async asyncData({ error }) {
    try {
      return {
        allRepositories: await fetchAllRepositories(),
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: 'Cannot fetch Repositories list' })
    }
  },
  data() {
    return {
      pageSize: 10,
      // ---------------------------Created for testing--------------------------------------------
      allRepositories: {},
      languages: {}
      // ---------------------------Created for testing--------------------------------------------
    }
  },
  computed: {
    checkedList() {
      const publicListList = []
      for (const i in this.allRepositories) {
        if (this.allRepositories[i].isPublic) {
          const rep = this.allRepositories[i]
          rep.id = i
          publicListList.push(rep)
        }
      }
      return publicListList
    }
  },
  methods: {
    routerPush(id) {
      this.$router.push(`/repositories/${id}/edit`)
    }
  },
  head: {
    title: `Profiler - Public Repositories`
  }
}
</script>

<style lang="sass">
@import '~/assets/pages_styles/listTables.sass'
</style>
