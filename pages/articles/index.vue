<template>
  <Page>
    <template #head>
      <PageHeader>
        <template #title>Edit Profile</template>
        <template #actions>
          <v-btn class="mx-1">Save</v-btn>
        </template>
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
              <tr v-for="item in publicList" :key="item.id">
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
                  <v-btn
                    v-if="!$store.getters.user.lists.articles.includes(item.id)"
                    @click="addTomMyList(item.id)"
                    icon
                    color="info"
                    ><v-icon>mdi-plus-circle</v-icon></v-btn
                  >
                  <v-btn
                    v-else-if="
                      $store.getters.user.lists.articles.includes(item.id)
                    "
                    @click="deleteFromMyList(item.id)"
                    icon
                    color="warning"
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
import { fetchAllArticles, fetchPublicArticlesIDS } from '~/functions/articles'
export default {
  name: 'Index',
  computed: {
    publicList() {
      const publicListList = []
      for (const i of this.publicArticlesIDS) {
        try {
          const art = this.allArticles[i]
          art.id = i
          publicListList.push(art)
        } catch (e) {
          continue
        }
      }
      return publicListList
    }
  },
  head: {
    title: `Profiler - Public Articles`
  },
  async asyncData() {
    return {
      allArticles: await fetchAllArticles(),
      publicArticlesIDS: await fetchPublicArticlesIDS()
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
    },
    addTomMyList(id) {
      try {
        this.$store.commit('pushArticle', id)
        this.$store.dispatch('updateUserInfo')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="sass">
td, th
  text-align: center !important
</style>
