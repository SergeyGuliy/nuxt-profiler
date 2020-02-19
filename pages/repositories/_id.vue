<template>
  <Page id="ShowRepository">
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
              <span class="font-weight-black">Язык:</span>
              <span>{{ data.language }}</span>
            </CardContainer>

            <CardContainer v-if="data.technology">
              <span class="font-weight-black">Технология:</span>
              <span>{{ data.technology }}</span>
            </CardContainer>

            <CardContainer>
              <span class="font-weight-black">Описание:</span>
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
              <span class="font-weight-black">Создатель:</span>
              <v-btn
                @click="$router.push(`/users/${data.creatorId}`)"
                color="blue"
                small
                outlined
                >{{ data.creatorName }}</v-btn
              >
            </CardContainer>
            <CardContainer v-if="data.cite">
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
            </CardContainer>
            <CardContainer>
              <span class="font-weight-black">Ссылка на gitHub:</span>
              <v-btn
                :href="data.gitHub"
                link
                target="_blank"
                color="blue"
                small
                outlined
              >
                {{ data.gitHub.split('://')[1] }}
              </v-btn>
            </CardContainer>
          </Card>
        </template>
      </PageBody>
    </template>
  </Page>
</template>

<script>
import { fetchRepositoryByID } from '~/functions/repositories'
export default {
  name: 'Id',
  async asyncData({ route, app }) {
    try {
      const data = await fetchRepositoryByID(route.params.id)
      const gitApiInfo = (await app.$axios.get(data.gitApiKey)).data
      console.log(gitApiInfo)
      return {
        data,
        gitApiInfo
      }
    } catch (e) {
      console.log(e)
    }
  },
  head: {
    title: `Profiler - Repository Information`
  }
}
</script>

<style lang="sass">
#ShowRepository
  p
    margin: 0 5px 5px 5px
</style>
