<template>
  <Page>
    <template #head>
      <PageHeader>
        <template #title>List of my Articles</template>
        <div class="flex">
          <v-btn
            @click="
              $router.push(`/${$store.getters.user.profile}/my_articles/create`)
            "
            class="mx-1"
            >Create</v-btn
          >
        </div>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="1">
        <template #c-1>
          <Table>
            <template #table-head>
              <tr>
                <th>Name</th>
                <th>Creator</th>
                <th>Actions</th>
              </tr>
            </template>
            <template #table-body>
              <tr v-for="item in myList" :key="item.id">
                <td>{{ item.name }}</td>
                <td>
                  <v-btn @click="$router.push(`/users/${item.id}`)"
                    >{{ item.creatorName }}
                    <v-icon>mdi-face-profile</v-icon></v-btn
                  >
                </td>
                <td>
                  <v-btn
                    @click="$router.push(`/articles/${item.id}`)"
                    icon
                    color="secondary"
                    ><v-icon>mdi-book</v-icon></v-btn
                  >
                  <v-btn @click="deleteFromMyList(item.id)" icon color="warning"
                    ><v-icon>mdi-minus-circle</v-icon></v-btn
                  >
                </td>
              </tr>
            </template>
          </Table>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchAllArticles } from '~/functions/articles'
export default {
  name: 'MyArticles',
  computed: {
    myList() {
      const myListIDS = this.$store.getters.user.lists.articles
      const myList = []
      for (const i of myListIDS) {
        try {
          const art = this.allArticles[i]
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
  async asyncData() {
    return {
      allArticles: await fetchAllArticles()
    }
  },
  methods: {
    deleteFromMyList(id) {
      try {
        this.$store.commit('deleteArticle', id)
        this.$store.dispatch('updateUserInfo')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="sass">
.v-data-table__wrapper tr > td > button.v-btn
  padding: 0 5px
  height: 27px
td, th
  text-align: center !important
</style>
