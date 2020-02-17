<template>
  <Page id="ShowRepository">
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
import { fetchRepositoryByID } from '~/functions/repositories'
export default {
  name: 'Id',
  async asyncData(route) {
    console.log(await fetchRepositoryByID(route.params.id))
    return {
      data: await fetchRepositoryByID(route.params.id)
    }
  },
  head: {
    title: `Profiler - Repository Information`
  }
}
</script>

<style scoped></style>
