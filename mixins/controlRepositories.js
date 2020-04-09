export const controlRepositories = {
  methods: {
    async deleteFromMyList(id) {
      try {
        await this.$store.dispatch('repositories/updateReposList', {
          type: 'remove',
          id
        })
        this.$dialog.message.error(`You delete repository`, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (e) {
        console.log(e)
      }
    },
    async addTomMyList(id) {
      try {
        await this.$store.dispatch('repositories/updateReposList', {
          type: 'add',
          id
        })
        this.$dialog.message.success(`You add repository`, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
