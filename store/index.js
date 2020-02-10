import firebase from 'firebase'
export const strict = false
export const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    try {
      const cookie = app.$cookies.get('access_token')
      await dispatch('fetchUserInfo', cookie)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchUserInfo({ commit }, uid) {
    try {
      const userInfo = (
        await firebase
          .database()
          .ref(`/1_users/${uid}/`)
          .once('value')
      ).val()
      commit('setUser', userInfo)
    } catch (e) {
      console.log(e)
    }
  },
  async createNewUser({ commit, dispatch }, data) {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
      const uid = (await firebase.auth().currentUser).uid
      await firebase
        .database()
        .ref(`/1_users/${uid}`)
        .set({
          id: uid,
          profile: data.email.split('@')[0],
          isAdmin: false,
          userInfo: {
            info: {
              first_name: '',
              last_name: '',
              date_of_birth: '',
              about: '',
              location: ''
            },
            contacts: {
              email: data.email,
              facebook: '',
              github: '',
              linkedIn: '',
              phone: '',
              site: ''
            },
            work: {
              work_status: '',
              work_type: '',
              work_position: '',
              work_languages: '',
              work_technologies: ''
            }
          },
          lists: {
            friends: ['empty'],
            articles: ['empty'],
            repositories: ['empty']
          }
        })
    } catch (e) {
      console.log(e)
    }
  },
  async logIn({ commit, dispatch }, data) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
    } catch (e) {
      console.log(e)
    }
  },
  async logOut({ commit }) {
    try {
      await firebase.auth().signOut()
      commit('cleanUser')
    } catch (e) {
      console.log(e)
    }
  },
  async updateUserInfo({ getters }) {
    try {
      const uid = (await firebase.auth().currentUser).uid
      await firebase
        .database()
        .ref(`/1_users/${uid}`)
        .update(getters.user)
    } catch (e) {
      console.log(e)
      console.log('Failed to update user info')
    }
  }
}

export const getters = {
  user: (s) => s.user,
  uid: (s) => s.uid
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  updateUserInfo(state, userInfo) {
    state.user.userInfo = userInfo
  },
  cleanUser(state) {
    state.user = ''
  },
  becomeAdmin(state) {
    state.user.isAdmin = true
  },
  pushArticle(state, id) {
    state.user.lists.articles.push(id)
  },
  pushRepository(state, id) {
    state.user.lists.repositories.push(id)
  },
  pushFriend(state, id) {
    state.user.lists.friends.push(id)
  },
  deleteArticle(state, id) {
    const IdToDelete = state.user.lists.articles.findIndex(
      (idSearch) => idSearch === id
    )
    state.user.lists.articles.splice(IdToDelete, 1)
  },
  deleteRepository(state, id) {
    const IdToDelete = state.user.lists.repositories.findIndex(
      (idSearch) => idSearch === id
    )
    state.user.lists.repositories.splice(IdToDelete, 1)
  },
  deleteFriend(state, id) {
    const IdToDelete = state.user.lists.friends.findIndex(
      (idSearch) => idSearch === id
    )
    state.user.lists.friends.splice(IdToDelete, 1)
  }
}

export const state = () => ({
  user: ''
})
