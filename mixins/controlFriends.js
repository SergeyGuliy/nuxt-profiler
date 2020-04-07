export const controlFriends = {
  methods: {
    async deleteFromMyList(id) {
      try {
        await this.$store.dispatch('updateFriendsList', {
          type: 'remove',
          id
        })
        this.$dialog.message.error(`You delete friend`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {
        console.log(e)
      }
    },
    async addTomMyList(id) {
      try {
        await this.$store.dispatch('updateFriendsList', {
          type: 'add',
          id
        })
        this.$dialog.message.success(`You add friend`, {
          position: 'top-right',
          timeout: 3000
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
