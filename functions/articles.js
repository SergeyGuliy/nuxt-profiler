import firebase from 'firebase/app'

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
  try {
    const push = await firebase
      .database()
      .ref(`/2_articles/`)
      .push(data)
    if (data.isPublic) {
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
  } catch (e) {}
}
async function fetchArticleByID(id) {
  try {
    return (
      await firebase
        .database()
        .ref(`/2_articles/${id}/`)
        .once('value')
    ).val()
  } catch (e) {
    throw Error
  }
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
