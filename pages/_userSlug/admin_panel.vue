<template>
  <BodyCard>
    <template #head>
      <BodyCardHeader>
        <template #title>List of my Articles</template>
        <div class="flex">
          <v-btn
            @click="
              $router.push(
                `/${$store.getters.user.profile}/my_repositories/create`
              )
            "
            class="mx-1"
            >Create</v-btn
          >
        </div>
      </BodyCardHeader>
    </template>
    <template #body>
      <BodyCardMain2>
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
      </BodyCardMain2>
    </template>
  </BodyCard>
</template>

<script>
export default {
  name: 'MyAdminPanel',
  head: {
    title: `Profiler - Admin Panel`
  }
}
</script>

<style scoped></style>
