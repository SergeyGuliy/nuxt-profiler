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
            repositories: ['empty'],
            articles: ['empty']
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
  async getArticle({ dispatch }) {
    try {
      const uid = await dispatch('getUID')
      return (
        await firebase
          .database()
          .ref(`/1_users/${uid}/lists/articles/0`)
          .once('value')
      ).val()
    } catch (e) {
      console.log(e)
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
  }
}

export const state = () => ({
  user: ''
})
