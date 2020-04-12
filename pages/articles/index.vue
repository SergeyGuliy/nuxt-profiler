<template>
  <Page id="listTables">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            checkedList.length > 0
              ? 'List of public Articles'
              : 'There is no public articles'
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
                <td v-if="$store.getters.loggedIn">
                  <TableIcon
                    v-if="
                      !$store.getters['articles/articles'].includes(item.id)
                    "
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
import { controlArticles } from '../../mixins/controlArticles'
import { filterMixin } from '~/mixins/filterMixin'
import { paginationMixin } from '~/mixins/paginationMixin'
import { fetchAllArticles } from '~/functions/articles'
import { fetchCategories } from '~/functions/language-technologies'

/**
 * ---(articles/index.vue)--- List of all articles. If user logged in, he can add or remove articles to his list
 * @module pages/articles/index
 *
 * @vue-data {string} searchKey               - Search field by name. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {string} language                - Search field by language. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {string} technology              - Search field by technology. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {Number} pageSize                - Count of items on page
 * @vue-event {context(error)} asyncData      - Return ['fetchAllArticles']{@link external:functions_articles}. Return ['fetchCategories']{@link external:functions_language_technologies}
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. From mixin: [controlArticles.js]{@link external:mixins_controlArticles}
 * @vue-event {id(string)} addTomMyList       - add to my list. From mixin: [controlArticles.js]{@link external:mixins_controlArticles}
 * @vue-computed {Array} checkedList          - Returns list of all valid articles.
 * @vue-computed {Array} listFiltered         - Returns list of all filtered 'checkedList'. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-computed {Array} listPaginated        - Returns list of all 'listFiltered', chunked on pages. From: [paginationMixin.js]{@link external:mixins_paginationMixin}
 */
export default {
  name: 'Index',
  mixins: [controlArticles, filterMixin, paginationMixin],
  transition: 'bounce',
  async asyncData({ error }) {
    try {
      return {
        allArticles: await fetchAllArticles(),
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: 'Cannot fetch Articles list' })
    }
  },
  data() {
    return {
      pageSize: 10
    }
  },
  computed: {
    checkedList() {
      const publicListArticles = []
      for (const i in this.allArticles) {
        if (this.allArticles[i].isPublic) {
          const art = this.allArticles[i]
          art.id = i
          publicListArticles.push(art)
        }
      }
      return publicListArticles
    }
  },
  head: {
    title: `Profiler - Public Articles`
  }
}
</script>

<style lang="sass">
@import '~/assets/pages_styles/listTables.sass'
</style>
