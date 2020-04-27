/**
 * This mixin contains logic to add or remove friend id to logged in user's list
 * @external mixins_controlFriends
 */
export const controlFriends = {
  methods: {
    /**
     * @memberOf external:mixins_controlFriends
     * @param id {string} - id to delete from my list
     * @returns {Promise<void>}
     */
    async deleteFromMyList(id) {
      try {
        await this.$store.dispatch('friends/updateFriendsList', {
          type: 'remove',
          id
        })
        this.$dialog.message.error(`You delete friend`, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (e) {
        console.log(`Error in trying to delete friend from my list: ${e}`)
      }
    },
    /**
     * @memberOf external:mixins_controlFriends
     * @param id {string} - id to add from my list
     * @returns {Promise<void>}
     */
    async addTomMyList(id) {
      try {
        await this.$store.dispatch('friends/updateFriendsList', {
          type: 'add',
          id
        })
        this.$dialog.message.success(`You add friend`, {
          position: 'top-right',
          timeout: 5000
        })
      } catch (e) {
        console.log(`Error in trying to add friend to my list: ${e}`)
      }
    }
  }
}
