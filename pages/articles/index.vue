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
        <template #actions v-if="checkedList.length > 0">
          <v-select
            :items="[5, 10, 15]"
            v-model="pageSize"
            label="Page size"
            outlined
            dense
            style="max-width: 56px;"
          />
          <v-select
            v-model="language"
            :items="Object.keys(languages)"
            label="Language"
            outlined
            clearable
            dense
          >
          </v-select>
          <v-select
            v-model="technology"
            :items="technologies"
            label="Technology"
            outlined
            clearable
            dense
          >
          </v-select>
          <v-text-field
            v-model="searchKey"
            label="Search"
            outlined
            clearable
            dense
          />
        </template>
      </PageHeader>
    </template>
    <template #body v-if="checkedList.length > 0">
      <PageBody col="1">
        <template #c-1>
          <Table v-if="listFiltered.length > 0">
            <template #table-head>
              <tr>
                <th>Name</th>
                <th>Creator</th>
                <th>Language</th>
                <th>Technology</th>
                <th v-if="$store.getters.user">Actions</th>
              </tr>
            </template>
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
                <td v-if="$store.getters.user">
                  <TableIcon
                    v-if="!$store.getters.user.lists.articles.includes(item.id)"
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
import { filterMixin } from '~/mixins/filterMixin'
import { paginationMixin } from '~/mixins/paginationMixin'
import { fetchAllArticles, fetchPublicArticlesIDS } from '~/functions/articles'
import { fetchCategories } from '~/functions/language-technologies'
export default {
  name: 'Index',
  mixins: [filterMixin, paginationMixin],
  transition: 'bounce',
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
  },
  async asyncData() {
    try {
      return {
        basicList: await fetchAllArticles(),
        publicArticlesIDS: await fetchPublicArticlesIDS(),
        languages: await fetchCategories()
      }
    } catch (e) {}
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteArticle', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.error(`You delete article`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
    },
    addTomMyList(id) {
      try {
        this.$store.commit('pushArticle', id)
        this.$store.dispatch('updateUserInfo')
        this.$dialog.message.success(`You add article`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {}
    }
  }
}
</script>
