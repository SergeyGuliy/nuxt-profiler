import firebase from 'firebase/app'
export const strict = false
export const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    try {
      const cookie = app.$cookies.get('access_token')
      await dispatch('fetchUserInfo', cookie)
    } catch (e) {
      await dispatch('logOut')
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
    } catch (e) {}
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
              git_type: '',
              github: '',
              gitApi: '',
              linkedIn: '',
              phone_code: '',
              phone: '',
              site: ''
            },
            work: {
              work_status: '',
              work_type: '',
              work_position: '',
              work_languages: ['empty'],
              work_technologies: ['empty']
            }
          },
          lists: {
            friends: ['empty'],
            articles: ['empty'],
            repositories: ['empty'],
            portfolio: ['empty']
          }
        })
      this.$cookies.set('access_token', uid)
      await dispatch('fetchUserInfo', uid)
      this.$router.go()
      this.$dialog.message.success(`You successfully registrated in base.`, {
        position: 'top-right',
        timeout: 3000
      })
    } catch (e) {}
  },
  async logIn({ commit, dispatch }, data) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
      const uid = await (await firebase.auth().currentUser).uid
      this.$cookies.set('access_token', uid)
      await dispatch('fetchUserInfo', uid)
      this.$router.go()
    } catch (e) {}
  },
  async logOut({ commit }) {
    try {
      await firebase.auth().signOut()
      this.$cookies.remove('access_token')
      commit('cleanUser')
      this.$router.go()
      this.$dialog.message.success(`You logged out from base.`, {
        position: 'top-right',
        timeout: 3000
      })
    } catch (e) {
      this.$cookies.remove('access_token')
      commit('cleanUser')
      this.$router.go()
    }
  },
  async updateUserInfo({ getters }) {
    try {
      const uid = (await firebase.auth().currentUser).uid
      await firebase
        .database()
        .ref(`/1_users/${uid}`)
        .update(getters.user)
    } catch (e) {}
  }
}

export const getters = {
  user: (s) => s.user
}

export const mutations = {
  updateUserInfo(state, userInfo) {
    state.user.userInfo = userInfo
  },
  setUser(state, user) {
    state.user = user
  },
  cleanUser(state) {
    state.user = ''
  },
  becomeAdmin(state) {
    state.user.isAdmin = true
  },
  unBecomeAdmin(state) {
    state.user.isAdmin = false
  },
  pushFriend(state, id) {
    state.user.lists.friends.push(id)
  },
  pushRepository(state, id) {
    state.user.lists.repositories.push(id)
  },
  pushArticle(state, id) {
    state.user.lists.articles.push(id)
  },
  pushPortfolioWork(state, work) {
    state.user.lists.portfolio.push(work)
  },
  deleteFriend(state, id) {
    const IdToDelete = state.user.lists.friends.findIndex(
      (idSearch) => idSearch === id
    )
    state.user.lists.friends.splice(IdToDelete, 1)
  },
  deleteRepository(state, id) {
    const IdToDelete = state.user.lists.repositories.findIndex(
      (idSearch) => idSearch === id
    )
    state.user.lists.repositories.splice(IdToDelete, 1)
  },
  deleteArticle(state, id) {
    const IdToDelete = state.user.lists.articles.findIndex(
      (idSearch) => idSearch === id
    )
    state.user.lists.articles.splice(IdToDelete, 1)
  },
  deletePortfolioWork(state, id) {
    try {
      state.user.lists.portfolio.splice(id + 1, 1)
    } catch (e) {
      console.log(e)
    }
  }
}

export const state = () => ({
  user: ''
})
