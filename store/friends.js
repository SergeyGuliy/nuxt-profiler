import firebase from 'firebase/app'
export const actions = {
  /**
   * This action will add or remove friend ID from list of user friends ID's
   * After that will be called pushing user friends ID's in to server
   * @param {string} type 'add' will call commit 'pushFriend'
   * @param {string} type 'remove' will call commit 'deleteFriend'
   * @param {string} id to 'add' or 'remove' from my list of ID's
   * @returns {Promise<void>}
   */
  async updateFriendsList({ state, commit }, { type, id }) {
    try {
      if (type === 'add') {
        commit('pushFriend', id)
      } else if (type === 'remove') {
        commit('deleteFriend', id)
      } else {
        throw new Error('Need select what you like to do with ID. add/remove')
      }
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/lists/friends`)
        .set(state.friends)
    } catch (e) {
      console.log(`Error in store action 'updateFriendsList': ${e}`)
    }
  }
}

export const mutations = {
  setUserFriends(state, list) {
    state.friends = list
  },
  cleanUserFriends(state) {
    state.friends = []
  },
  pushFriend(state, id) {
    state.friends.push(id)
  },
  deleteFriend(state, rootState, id) {
    const IdToDelete = state.friends.findIndex((idSearch) => idSearch === id)
    state.friends.splice(IdToDelete, 1)
  }
}

export const state = () => ({
  friends: []
})

export const getters = {
  friends: (state) => state.friends
}
