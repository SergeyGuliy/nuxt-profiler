<template>
  <Page id="ShowArticle">
    <template #head>
      <PageHeader>
        <template #title>{{ data.name }}</template>
        <template #actions>
          <v-btn
            @click="addTomMyList($route.params.id)"
            v-if="
              !$store.getters.user.lists.articles.includes($route.params.id)
            "
            class="mx-1"
            color="green"
            >Add to my list
          </v-btn>
          <v-btn
            @click="deleteFromMyList($route.params.id)"
            v-else
            class="mx-1"
            color="red"
            >remove from my list
          </v-btn>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="2">
        <template #c-1>
          <Card>
            <CardContainer v-if="data.language">
              <LineTitle>Language:</LineTitle>
              <span>{{ data.language }}</span>
            </CardContainer>
            <CardContainer v-if="data.technology">
              <LineTitle>Technology:</LineTitle>
              <span>{{ data.technology }}</span>
            </CardContainer>
            <CardContainer>
              <LineTitle>Description:</LineTitle>
            </CardContainer>
            <CardContainer>
              <p v-if="data.about">{{ data.about }}</p>
              <p v-else>
                Description is empty.
              </p>
            </CardContainer>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <CardContainer>
              <LineTitle>Creator:</LineTitle>
              <BtnRouter
                :link="`/users/${data.creatorId}`"
                :text="data.creatorName"
                icon="mdi-face-profile"
              />
            </CardContainer>
            <CardContainer>
              <LineTitle>Link to article:</LineTitle>
              <div>
                <BtnOpenBlank :link="data.cite" />
                <BtnCopy :copyValue="data.cite" />
              </div>
            </CardContainer>
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
  async asyncData(route) {
    try {
      return {
        data: await fetchArticleByID(route.params.id)
      }
    } catch (e) {}
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

<style lang="sass">
#ShowArticle
  p
    margin: 0 5px 5px 5px
</style>
