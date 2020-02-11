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
          <Card>
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </Card>
        </template>
        <template #c-2>
          <Card>
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </Card>
        </template>
        <template #c-3>
          <Card>
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </Card>
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
