<template>
  <Page id="userPortfolio">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            listFiltered.length > 0
              ? `${userName} portfolio`
              : `${userName} portfolio is empty`
          }}
        </template>
        <template #actions v-if="listFiltered.length > 0">
          <v-select
            :items="[1, 3, 6]"
            v-model="pageSize"
            label="Page size"
            outlined
            dense
            style="max-width: 56px;"
          />
        </template>
      </PageHeader>
    </template>
    <template #body v-if="listFiltered.length > 0">
      <div class="flex-portfolio">
        <PortfolioList :checkedList="listPaginated[pageCurrent - 1]" />
        <v-pagination v-model="pageCurrent" :length="listPaginated.length" />
      </div>
    </template>
  </Page>
</template>

<script>
import { fetchUserByID } from '~/functions/users'
import { paginationMixin } from '~/mixins/paginationMixin'

export default {
  name: 'Portfolio',
  mixins: [paginationMixin],
  data() {
    return {
      pageSize: 3
    }
  },
  computed: {
    listFiltered() {
      return this.userData.lists.portfolio.filter((item) => {
        return item !== 'empty'
      })
    },
    userName() {
      if (
        this.userData.userInfo.info.first_name &&
        this.userData.userInfo.info.last_name
      ) {
        return `${this.userData.userInfo.info.first_name} ${this.userData.userInfo.info.last_name}`
      } else {
        return `${this.userData.profile}`
      }
    }
  },
  async asyncData({ route }) {
    try {
      return {
        userData: await fetchUserByID(route.params.id)
      }
    } catch (e) {}
  },
  head: {
    title: `Profiler - User Portfolio`
  }
}
</script>
