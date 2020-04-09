<template>
  <Page id="allArticles">
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
import { fetchAllArticles, fetchPublicArticlesIDS } from '~/functions/articles'
import { fetchCategories } from '~/functions/language-technologies'
export default {
  name: 'Index',
  mixins: [controlArticles, filterMixin, paginationMixin],
  transition: 'bounce',
  async asyncData({ error }) {
    try {
      return {
        basicList: await fetchAllArticles(),
        publicArticlesIDS: await fetchPublicArticlesIDS(),
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
      for (const i of this.publicArticlesIDS) {
        try {
          const art = this.basicList[i]
          art.id = i
          publicListArticles.push(art)
        } catch (e) {
          continue
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
