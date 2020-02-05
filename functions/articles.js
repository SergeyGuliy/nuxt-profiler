import firebase from 'firebase'

async function fetchAllArticles() {
  return (
    (
      await firebase
        .database()
        .ref(`/2_articles/`)
        .once('value')
    ).val() || {}
  )
}
async function createArticle(data) {
  const push = await firebase
    .database()
    .ref(`/2_articles/`)
    .push(data)
  if (data.accessibility === 'public') {
    const item =
      (
        await firebase
          .database()
          .ref(`/systemData/public/articles/`)
          .once('value')
      ).val() || []
    item.push(push.key)
    await firebase
      .database()
      .ref(`/systemData/public/articles`)
      .set(item)
  }
  return push.key
}
async function fetchArticleByID(id) {
  return (
    (
      await firebase
        .database()
        .ref(`/2_articles/${id}/`)
        .once('value')
    ).val() || {}
  )
}
async function fetchPublicArticlesIDS() {
  return (
    (
      await firebase
        .database()
        .ref(`/systemData/public/articles`)
        .once('value')
    ).val() || []
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
export {
  fetchAllArticles,
  createArticle,
  fetchArticleByID,
  fetchPublicArticlesIDS,
  fetchPrivateArticlesIDS
}
