import firebase from 'firebase'
async function fetchUserPortfolio(userId) {
  return (
    (
      await firebase.database
        .ref(`1_users/${userId}/lists/portfolio`)
        .once('value')
    ).val() || {}
  )
}
async function fetchUserPortfolioById(userId, workId) {
  return (
    (
      await firebase.database
        .ref(`1_users/${userId}/lists/portfolio/${workId}`)
        .once('value')
    ).val() || {}
  )
}
async function createPortfolioWork(userId, data) {
  try {
    await firebase
      .database()
      .ref(`1_users/${userId}/lists/portfolio/`)
      .push(data)
  } catch (e) {
    console.log(e)
  }
}
export { fetchUserPortfolio, fetchUserPortfolioById, createPortfolioWork }
