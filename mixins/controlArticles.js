export const controlArticles = {
  methods: {
    async deleteFromMyList(id) {
      try {
        await this.$store.dispatch('updateArticlesList', { type: 'remove', id })
        this.$dialog.message.error(`You delete article`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {
        console.log(e)
      }
    },
    async addTomMyList(id) {
      try {
        await this.$store.dispatch('updateArticlesList', { type: 'add', id })
        this.$dialog.message.success(`You add article`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
