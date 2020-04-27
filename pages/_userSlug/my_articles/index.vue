<template>
  <Page id="listTables">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            checkedList.length > 0
              ? 'List of my articles'
              : "You don't have articles"
          }}
          <BtnCreate :link="`/${$store.getters.profile}/my_articles/create`" />
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
                <td>
                  <TableIcon
                    v-if="$store.getters.id === item.creatorId"
                    :item="item.id"
                    :action="routerPush"
                    color="orange"
                    icon="mdi-pencil-circle"
                  />
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
import BtnCreate from '../../../components/buttons_components/BtnCreate'
import { filterMixin } from '../../../mixins/filterMixin'
import { controlArticles } from '../../../mixins/controlArticles'
import { paginationMixin } from '~/mixins/paginationMixin'
import { fetchCategories } from '~/functions/language-technologies'
import { fetchAllArticles } from '~/functions/articles'

/**
 * ---(_userSlug/my_articles/index.vue)--- List of all user's articles
 * @module pages/_userSlug/my_articles/index
 *
 * @vue-data {string} searchKey               - Search field by name. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {string} language                - Search field by language. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {string} technology              - Search field by technology. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-data {Number} pageSize                - Count of items on page
 * @vue-event {context(error)} asyncData      - Return ['fetchAllArticles']{@link external:functions_articles} Return [fetchCategories']{@link external:functions_language_technologies}
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. From mixin: [controlArticles.js]{@link external:mixins_controlArticles}
 * @vue-computed {Array} checkedList          - Returns list of all user's articles.
 * @vue-computed {Array} listFiltered         - Returns list of all filtered 'checkedList'. From: [filterMixin.js]{@link external:mixins_filterMixin}
 * @vue-computed {Array} listPaginated        - Returns list of all 'listFiltered' chunked on pages. From: [paginationMixin.js]{@link external:mixins_paginationMixin}
 */
export default {
  name: 'MyArticles',
  components: { BtnCreate },
  mixins: [controlArticles, filterMixin, paginationMixin],

  async asyncData({ error }) {
    try {
      return {
        basicList: await fetchAllArticles(),
        languages: await fetchCategories()
      }
    } catch (e) {
      error({ message: "Can't fetch your articles." })
    }
  },
  data() {
    return {
      pageSize: 10,
      // ---------------------------Created for testing--------------------------------------------
      basicList: {},
      languages: {}
      // ---------------------------Created for testing--------------------------------------------
    }
  },
  computed: {
    checkedList() {
      const myListIDS = this.$store.getters['articles/articles']
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
  methods: {
    routerPush(id) {
      this.$router.push(`/articles/${id}/edit`)
    }
  },
  head: {
    title: `Profiler - My Articles`
  }
}
</script>

<style lang="sass">
@import '~/assets/pages_styles/listTables.sass'
</style>
