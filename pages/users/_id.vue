<template>
  <Page id="ShowUser">
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
import { fetchUserByID } from '~/functions/users'
export default {
  name: 'Id',
  async asyncData(route) {
    return {
      data: await fetchUserByID(route.params.id)
    }
  },
  head: {
    title: `Profiler - User Information`
  }
}
</script>

<style scoped></style>
