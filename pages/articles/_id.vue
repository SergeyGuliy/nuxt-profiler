<template>
  <Page id="ShowArticle">
    <template #head>
      <PageHeader>
        <template #title>{{ data.name }}</template>
        <template #actions>
          <v-btn class="mx-1">Save</v-btn>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="2">
        <template #c-1>
          <Card>
            <CardContainer v-if="data.language">
              <LineTitle>Язык:</LineTitle>
              <span>{{ data.language }}</span>
            </CardContainer>
            <CardContainer v-if="data.technology">
              <LineTitle>Технология:</LineTitle>
              <span>{{ data.technology }}</span>
            </CardContainer>
            <CardContainer>
              <LineTitle>Описание:</LineTitle>
            </CardContainer>
            <CardContainer>
              <p v-if="data.about">{{ data.about }}</p>
              <p v-else>
                Описание отсутствует.
              </p>
            </CardContainer>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <CardContainer>
              <LineTitle>Создатель:</LineTitle>
              <BtnRouter
                :link="`/users/${data.creatorId}`"
                :text="data.creatorName"
                icon="mdi-face-profile"
              />
            </CardContainer>
            <CardContainer>
              <LineTitle>Ссылка на статью:</LineTitle>
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
    } catch (e) {
      console.log(e)
    }
  },
  head: {
    title: `Profiler - Article Information`
  }
}
</script>

<style lang="sass">
#ShowArticle
  p
    margin: 0 5px 5px 5px
</style>
