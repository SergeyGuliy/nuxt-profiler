<template>
  <Page id="invoice">
    <template #head>
      <PageHeader>
        <template #title>
          Profiler is service for making bookmarks for articles and
          repositories.
        </template>
      </PageHeader>
    </template>
    <template #body>
      invoice
    </template>
  </Page>
</template>

<script>
import Page from '../components/global_components/Page'
import PageHeader from '../components/global_components/PageHeader'

export default {
  name: 'Invoice',
  components: {
    Page,
    PageHeader
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
#invoice {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
