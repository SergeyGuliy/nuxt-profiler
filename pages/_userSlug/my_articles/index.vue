<template>
  <Page id="myArticles">
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
import BtnCreate from '../../../components/buttons_components/BtnCreate'
import { filterMixin } from '../../../mixins/filterMixin'
import { controlArticles } from '../../../mixins/controlArticles'
import { paginationMixin } from '~/mixins/paginationMixin'
import { fetchCategories } from '~/functions/language-technologies'
import { fetchAllArticles } from '~/functions/articles'
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
      pageSize: 10
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
  head: {
    title: `Profiler - My Articles`
  }
}
</script>
