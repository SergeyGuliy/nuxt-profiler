<template>
  <Page id="ShowArticle">
    <template #head>
      <PageHeader>
        <template #title>{{ data }}</template>
        <template #actions>
          <v-btn class="mx-1">Save</v-btn>
        </template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="2">
        <template #c-1>
          <Card>
            <div class="flex">
              <span class="font-weight-black">Название:</span>
              <span>{{ data.name }}</span>
            </div>
            <div class="flex">
              <span class="font-weight-black">Язык:</span>
              <span>{{ data.language }}</span>
            </div>
            <div class="flex">
              <span class="font-weight-black">Технология:</span>
              <span>{{ data.technology }}</span>
            </div>
            <span class="font-weight-black">Описание:</span>
            <p v-if="data.about">{{ data.about }}</p>
            <p v-else>
              Описание отсутствует gefwe wef wef f ffffffwef wef weffqhg
            </p>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <div class="flex">
              <span class="font-weight-black">Создатель:</span>
              <v-btn
                @click="$router.push(`/users/${data.creatorId}`)"
                color="blue"
                small
                outlined
                >{{ data.creatorName }}</v-btn
              >
            </div>
            <div class="flex">
              <span class="font-weight-black">Ссылка на статью:</span>
              <v-btn
                :href="data.cite"
                link
                target="_blank"
                color="blue"
                small
                outlined
              >
                {{ data.cite.split('://')[1] }}
              </v-btn>
            </div>
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
  async asyncData(route) {
    return {
      data: await fetchArticleByID(route.params.id)
    }
  },
  head: {
    title: `Profiler - Article Information`
  }
}
</script>

<style lang="sass">
#ShowArticle
  .flex
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 6px
    a, button
      padding: 0 5px
      letter-spacing: 0.7px
      max-width: 240px
</style>
