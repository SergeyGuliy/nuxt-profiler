/**
 * This mixin contains logic to add or remove repository id to logged in user's list
 * @external mixins_controlRepositories
 */
export const controlRepositories = {
  methods: {
    /**
     * @memberOf external:mixins_controlRepositories
     * @param id {string} - id to delete from my list
     * @returns {Promise<void>}
     */
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
        console.log(`Error in trying to delete repository from my list: ${e}`)
      }
    },
    /**
     * @memberOf external:mixins_controlRepositories
     * @param id {string} - id to add from my list
     * @returns {Promise<void>}
     */
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
        console.log(`Error in trying to add repository to my list: ${e}`)
      }
    }
  }
}
