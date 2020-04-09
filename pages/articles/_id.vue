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
          <div v-if="data.isPublic && $store.getters.loggedIn">
            <v-btn
              v-if="
                !$store.getters['articles/articles'].includes($route.params.id)
              "
              color="green"
              @click="addTomMyList($route.params.id)"
            >
              <v-icon>mdi-book-plus</v-icon>
            </v-btn>
            <v-btn
              v-else
              color="red"
              @click="deleteFromMyList($route.params.id)"
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
                <BtnCopy :copy-value="data.cite" />
              </div>
            </CardRow>
          </Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { controlArticles } from '../../mixins/controlArticles'
import { fetchArticleByID } from '~/functions/articles'
export default {
  name: 'Id',
  transition: 'bounce',
  mixins: [controlArticles],
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
  }
}
</script>
