<template>
  <Page id="userArticles">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            checkedList.length > 0
              ? `${userName} articles`
              : `${userName} don't have articles`
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
                <td v-if="item.isPublic && $store.getters.user">
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
import { filterMixin } from '../../../mixins/filterMixin'
import { paginationMixin } from '~/mixins/paginationMixin'
import { fetchCategories } from '~/functions/language-technologies'
import { fetchAllArticles } from '~/functions/articles'
import { fetchUserByID } from '~/functions/users'
export default {
  name: 'Articles',
  mixins: [filterMixin, paginationMixin],
  data() {
    return {
      pageSize: 10
    }
  },
  computed: {
    userName() {
      if (
        this.userData.userInfo.info.first_name &&
        this.userData.userInfo.info.last_name
      ) {
        return `${this.userData.userInfo.info.first_name} ${this.userData.userInfo.info.last_name}`
      } else {
        return `${this.userData.profile}`
      }
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
  },
  async asyncData({ route }) {
    try {
      return {
        userData: await fetchUserByID(route.params.id),
        basicList: await fetchAllArticles(),
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
