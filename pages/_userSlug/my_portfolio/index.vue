<template>
  <Page id="userPortfolio">
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
import BtnCreate from '../../../components/buttons_components/BtnCreate'
import PortfolioList from '../../../components/pages_components/PortfolioList'
import { paginationMixin } from '~/mixins/paginationMixin'

/**
 * ---(_userSlug/my_portfolio/index.vue)--- List of all user's portfolio works
 * @module pages/_userSlug/my_portfolio/index
 *
 * @vue-data {Number} pageSize                - Count of items on page
 * @vue-event {context(error)} asyncData      - Fetch list of portfolio works from store. [store.getters'portfolio/portfolio']{@link external:store_portfolio}
 * @vue-event {id(string)} deleteFromMyList   - delete from my list. Call action ['updatePortfolio']{@link external:store_portfolio}
 * @vue-computed {Array} listFiltered         - Returns list of all valid user's portfolio works.
 * @vue-computed {Array} listPaginated        - Returns list of all 'listFiltered' chunked on pages. From: [paginationMixin.js]{@link external:mixins_paginationMixin}
 */
export default {
  name: 'MyPortfolio',
  components: { PortfolioList, BtnCreate },
  mixins: [paginationMixin],
  data() {
    return {
      pageSize: 3
    }
  },
  computed: {
    allWorks() {
      return this.$store.getters['portfolio/portfolio']
    },
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

<style lang="sass">
@import '~/assets/pages_styles/userPortfolio.sass'
</style>
