import firebase from 'firebase/app'

async function fetchAllUsers() {
  return (
    (
      await firebase
        .database()
        .ref(`/1_users/`)
        .once('value')
    ).val() || {}
  )
}
async function fetchUserByID(id) {
  return (
    (
      await firebase
        .database()
        .ref(`/1_users/${id}/`)
        .once('value')
    ).val() || {}
  )
}
async function fetchPrivateArticlesIDS(userID) {
  return (
    (
      await firebase
        .database()
        .ref(`/1_users/${userID}/articles`)
        .once('value')
    ).val() || []
  )
}
export { fetchAllUsers, fetchUserByID, fetchPrivateArticlesIDS }
