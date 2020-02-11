<template>
  <Page>
    <template #head>
      <PageHeader>
        <template #title>Edit Profile</template>
      </PageHeader>
    </template>
    <template #body>
      <PageBody col="3">
        <template #c-1>
          <Card> </Card>
        </template>
        <template #c-2>
          <Card> </Card>
        </template>
        <template #c-3>
          <Card> </Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      loading: false
    }
  },
  methods: {
    async submitBecomeAdmin() {
      this.loading = true
      this.$store.commit('becomeAdmin')
      await this.$store.dispatch('updateUserInfo')
      this.dialog = false
    }
  }
}
</script>

<style scoped></style>
