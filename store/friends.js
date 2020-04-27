/**
 * This store module contain logic to control logged in user list of friends
 * @external store_friends
 */
import firebase from 'firebase/app'

/**
 * @memberOf external:store_friends
 * @property {Function} updateFriendsList    - {@link }This action will add or remove friend ID from list of my friend ID's. After that will be called pushing user friends ID's in to server
 */
export const actions = {
  /**
   * @async
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

/**
 * @memberOf external:store_friends
 * @property {Function} setUserFriends     - Commit filling local state. Called in action: 'fetchUserInfo'
 * @property {Function} cleanUserFriends   - Clean local state. Called in action: 'logOut'
 * @property {Function} pushFriend         - Add friend to my list
 * @property {Function} deleteFriend       - Remove friend from my list
 */
export const mutations = {
  /** @param list {Array} */
  setUserFriends(state, list) {
    state.friends = list
  },
  cleanUserFriends(state) {
    state.friends = []
  },

  /** @param id {String} */
  pushFriend(state, id) {
    state.friends.push(id)
  },

  /** @param id {String} */
  deleteFriend(state, id) {
    const IdToDelete = state.friends.findIndex((idSearch) => idSearch === id)
    state.friends.splice(IdToDelete, 1)
  }
}

export const state = () => ({
  friends: []
})

/**
 * @memberOf external:store_friends
 * @property {Function} friends      - Return user list of friends
 */
export const getters = {
  /** @returns {Array} */
  friends: (state) => state.friends
}
