import firebase from 'firebase/app'
export const strict = false
export const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    // Fetching user info in server side
    try {
      // I am using cookies to be able fetch user info while server rendering.
      // Because 'firebase.auth().currentUser.uid' can't be invoked in server side.
      const cookie = app.$cookies.get('access_token')
      await dispatch('fetchUserInfo', cookie)
    } catch (e) {
      await dispatch('logOut')
    }
  },
  async fetchUserInfo({ commit, dispatch, getters }, uid) {
    try {
      const userInfo = (
        await firebase
          .database()
          .ref(`/1_users/${uid}/`)
          .once('value')
      ).val()
      commit('setUser', userInfo)
    } catch (e) {
      // If fetching user info will thow an error, will be invoked logging out user from base
      await dispatch('logOut')
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
          themeDark: true,
          userInfo: {
            info: {
              first_name: '',
              last_name: '',
              date_of_birth: '',
              about: '',
              location: '',
              education: ''
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
              site: '',
              skype: ''
            },
            work: {
              work_status: '',
              work_type: '',
              work_position: '',
              work_scope: '',
              work_languages: ['empty'],
              work_technologies: ['empty']
            }
          },
          lists: {
            // This is not correctly, but this decision is need for correctly working Firebase database.
            // Because if you create in Firebase database empty array it will be immediately removed.
            // I will be able to create in all pages checking is array exists, abd if not it will create new array with item,
            // but it will bring a lot of extra code in all pages, so i decide to create arrays with first item 'empty'
            // In all pages are used filtrating to dont showing this 'empty'
            friends: ['empty'],
            articles: ['empty'],
            repositories: ['empty'],
            portfolio: ['empty']
          }
        })
      this.$cookies.set('access_token', uid)
      await dispatch('fetchUserInfo', uid)
      this.$router.go()
    } catch (e) {
      console.log(e)
      throw e
    }
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
    } catch (e) {
      throw e
    }
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
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}`)
        .update(getters.user)
    } catch (e) {
      console.log('Error Updating User info')
      console.log(e)
    }
  },
  async changeTheme({ getters, commit }) {
    try {
      commit('toggleTheme')
      const uid = this.$cookies.get('access_token')
      await firebase
        .database()
        .ref(`/1_users/${uid}/themeDark`)
        .set(getters.user.themeDark)
    } catch (e) {
      console.log('Error Updating User info')
      console.log(e)
    }
  }
}

export const mutations = {
  toggleTheme(state) {
    state.user.themeDark = !state.user.themeDark
  },
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

export const getters = {
  user: (s) => s.user
}
