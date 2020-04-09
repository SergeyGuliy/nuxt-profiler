<template>
  <Page id="myPortfolio">
    <template #head>
      <PageHeader>
        <template #title>
          {{
            listFiltered.length > 0
              ? 'List of my Works'
              : 'Your portfolio is empty'
          }}
          <BtnCreate :link="`/${$store.getters.profile}/my_portfolio/create`" />
        </template>
        <template v-if="listFiltered.length > 0" #actions>
          <v-select
            v-model="pageSize"
            :items="[3, 5, 7, 9]"
            label="Page size"
            style="max-width: 56px;"
          />
        </template>
      </PageHeader>
    </template>
    <template v-if="listFiltered.length > 0" #body>
      <div class="flex-portfolio">
        <PortfolioList :checked-list="listPaginated[pageCurrent - 1]" />
        <v-pagination v-model="pageCurrent" :length="listPaginated.length" />
      </div>
    </template>
  </Page>
</template>

<script>
import { paginationMixin } from '~/mixins/paginationMixin'
export default {
  name: 'MyPortfolio',
  mixins: [paginationMixin],
  asyncData({ store, error }) {
    try {
      return {
        allWorks: store.getters.user.lists.portfolio
      }
    } catch (e) {
      error({ message: "Can't fetch your portfolio." })
    }
  },
  data() {
    return {
      pageSize: 3
    }
  },
  computed: {
    listFiltered() {
      return this.allWorks.filter((item) => {
        return item !== 'empty'
      })
    }
  },
  head: {
    title: `Profiler - My Portfolio`
  }
}
</script>
