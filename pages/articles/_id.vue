<template>
  <Page id="ShowArticle">
    <template #head>
      <PageHeader>
        <template #title>
          {{ data.name }}
          <v-chip small class="title-chip">
            {{ data.isPublic ? 'Public' : 'Private' }}
          </v-chip>
        </template>
        <template #actions>
          <BtnPrint />
          <BtnShare :link="`articles/${$route.params.id}`" />
          <div v-if="data.isPublic && $store.getters.user">
            <v-btn
              @click="addTomMyList($route.params.id)"
              v-if="
                !$store.getters.user.lists.articles.includes($route.params.id)
              "
              class="mx-1"
              color="green"
            >
              <v-icon>mdi-book-plus</v-icon>
            </v-btn>
            <v-btn
              @click="deleteFromMyList($route.params.id)"
              v-else
              class="mx-1"
              color="red"
            >
              <v-icon>mdi-book-minus</v-icon>
            </v-btn>
          </div>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="2">
        <template #c-1>
          <Card>
            <CardRow v-if="data.language">
              <CardRowTitle>Language:</CardRowTitle>
              <span>{{ data.language }}</span>
            </CardRow>
            <CardRow v-if="data.technology">
              <CardRowTitle>Technology:</CardRowTitle>
              <span>{{ data.technology }}</span>
            </CardRow>
            <CardRow>
              <CardRowTitle>Description:</CardRowTitle>
            </CardRow>
            <CardRow>
              <p v-if="data.about">{{ data.about }}</p>
              <p v-else>Description is empty.</p>
            </CardRow>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <CardRow>
              <CardRowTitle>Creator:</CardRowTitle>
              <BtnRouter
                :link="`/users/${data.creatorId}`"
                :text="data.creatorName"
                icon="mdi-face-profile"
              />
            </CardRow>
            <CardRow>
              <CardRowTitle>Link to article:</CardRowTitle>
              <div>
                <BtnOpenBlank :link="data.cite" />
                <BtnCopy :copyValue="data.cite" />
              </div>
            </CardRow>
          </Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchArticleByID } from '~/functions/articles'
export default {
  name: 'Id',
  transition: 'bounce',
  async asyncData({ route, error }) {
    try {
      const data = await fetchArticleByID(route.params.id)
      if (data === null) {
        error({ message: 'Article not found' })
      }
      return {
        data
      }
    } catch (e) {
      error({ message: 'Article not found' })
    }
  },
  head: {
    title: `Profiler - Article Information`
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
