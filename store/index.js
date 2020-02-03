import firebase from 'firebase'

export const actions = {
  async getUID() {
    return (await firebase.auth().currentUser).uid
  },
  async fetchUserInfo({ commit, dispatch }) {
    try {
      const uid = await dispatch('getUID')
      const userInfo = (
        await firebase
          .database()
          .ref(`/1_users/${uid}/`)
          .once('value')
      ).val()
      if (userInfo.lists.friends === '') {
        userInfo.lists.friends = []
      }
      if (userInfo.lists.articles === '') {
        userInfo.lists.articles = []
      }
      if (userInfo.lists.repositories === '') {
        userInfo.lists.repositories = []
      }
      console.log(userInfo)
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
      const uid = await dispatch('getUID')
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
      await dispatch('fetchUserInfo')
    } catch (e) {
      console.log(e)
    }
  },
  async logIn({ commit, dispatch }, data) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
      await dispatch('fetchUserInfo')
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
  async updateUserInfo({ dispatch, getters }) {
    try {
      const uid = await dispatch('getUID')
      await firebase
        .database()
        .ref(`/1_users/${uid}`)
        .update(getters.user)
    } catch (e) {
      console.log('Failed to update user info')
    }
  }
}

export const getters = {
  user: (s) => s.user
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  cleanUser(state) {
    state.user = ''
  },
  pushArticle(state, id) {
    state.user.lists.articles.push(id)
  },
  pushRepository(state, id) {
    state.user.lists.repositories.push(id)
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
  }
}

export const state = () => ({
  user: ''
})
