<template>
  <div id="PortfolioList">
    <v-card v-for="item in checkedList" :key="item.key" raised elevation="20">
      <v-card-title>
        {{ item.name }}
        <v-btn
          v-if="loggedIn && item.creatorId === id"
          color="red"
          icon
          @click="deleteFromMyList(item.key)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>

      <client-only>
        <div class="frame">
          <iframe :src="item.cite" frameborder="0" />
        </div>
      </client-only>

      <v-card-actions>
        <v-btn :href="item.cite" link target="_blank">Link to site</v-btn>
        <v-btn v-if="item.gitHub" :href="item.gitHub" link target="_blank">
          link to github
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { paginationMixin } from '~/mixins/paginationMixin'
export default {
  name: 'PortfolioList',
  mixins: [paginationMixin],
  props: { checkedList: Array },
  methods: {
    async deleteFromMyList(item) {
      try {
        const answer = await this.$dialog.confirm({
          text: `Do you want to delete ${item.name} form your portfolio?`,
          title: 'Warning'
        })
        if (answer) {
          await this.$store.dispatch('portfolio/updatePortfolio', {
            type: 'remove',
            work: item
          })
          this.$dialog.message.error(`You delete work from portfolio`, {
            position: 'top-right',
            timeout: 3000
          })
        }
      } catch (e) {
        this.$dialog.message.error(`Unsuccessfully deleting`, {
          position: 'top-right',
          timeout: 3000
        })
      }
    }
  },
  computed: {
    ...mapGetters(['id', 'loggedIn'])
  }
}
</script>

<style lang="sass">
#PortfolioList
  display: flex
  flex-direction: row
  justify-content: center
  flex-wrap: wrap
  .v-card
    max-width: 370px
    margin: 5px
    overflow: hidden
    .frame
      width: 370px
      height: 200px
      position: relative
      margin: 0 auto
      iframe
        position: relative
        width: 1480px
        height: 800px
        top: -300px
        left: -555px
        background-color: #e0e0e0
        transform: scale(0.25)
        pointer-events: none
    .v-card__title
      display: flex
      justify-content: center
    .v-card__actions
      justify-content: center
      .v-btn
        flex: 1 1 auto
</style>
