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
        <template #c-1> </template>
        <template #c-2> </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchArticleByID } from '~/functions/articles'
export default {
  name: 'Id',
  async asyncData(route) {
    console.log(await fetchArticleByID(route.params.id))
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
</style>
