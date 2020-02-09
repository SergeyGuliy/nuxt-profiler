<template>
  <BodyCard>
    <template #head>
      <BodyCardHeader>
        <template #title>Edit Profile</template>
        <div class="flex">
          <v-dialog
            v-model="dialog"
            v-if="!$store.getters.user.isAdmin"
            persistent
            max-width="290"
          >
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" mx-1>Become admin</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline"
                >Use Google's location service?</v-card-title
              >
              <v-card-text
                >Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false">Disagree</v-btn>
                <v-btn
                  @click="submitBecomeAdmin"
                  :loading="loading"
                  :disabled="loading"
                  color="primary"
                  >Agree</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn class="mx-1">Save</v-btn>
        </div>
      </BodyCardHeader>
    </template>
    <template #body>
      <BodyCardMain3>
        <template #c-1>
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <template #c-2>
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <template #c-3>
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </BodyCardMain3>
    </template>
  </BodyCard>
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
