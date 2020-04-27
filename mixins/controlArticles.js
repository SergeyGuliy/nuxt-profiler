/**
 * This mixin contains logic to add or remove article id to logged in user's list
 * @external mixins_controlArticles
 */
export const controlArticles = {
  methods: {
    /**
     * @memberOf external:mixins_controlArticles
     * @param id {string} - id to delete from my list
     * @returns {Promise<void>}
     */
    async deleteFromMyList(id) {
      try {
        await this.$store.dispatch('articles/updateArticlesList', {
          type: 'remove',
          id
        })
        this.$dialog.message.error(`You delete article`, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (e) {
        console.log(`Error in trying to delete article from my list: ${e}`)
      }
    },
    /**
     * @memberOf external:mixins_controlArticles
     * @param id {string} - id to add from my list
     * @returns {Promise<void>}
     */
    async addTomMyList(id) {
      try {
        await this.$store.dispatch('articles/updateArticlesList', {
          type: 'add',
          id
        })
        this.$dialog.message.success(`You add article`, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (e) {
        console.log(`Error in trying to add article to my list: ${e}`)
      }
    }
  }
}
