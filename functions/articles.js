import firebase from 'firebase'

async function fetchAllArticles() {
  const data =
    (
      await firebase
        .database()
        .ref(`/2_articles/`)
        .once('value')
    ).val() || {}
  console.log(data)
  return data
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
  const data =
    (
      await firebase
        .database()
        .ref(`/2_articles/${id}/`)
        .once('value')
    ).val() || {}
  console.log(data)
  return data
}
async function fetchPublicArticlesIDS() {
  const data =
    (
      await firebase
        .database()
        .ref(`/systemData/public/articles`)
        .once('value')
    ).val() || []
  console.log(data)
  return data
}
async function fetchPrivateArticlesIDS(userID) {
  const data =
    (
      await firebase
        .database()
        .ref(`/1_users/${userID}/articles`)
        .once('value')
    ).val() || []
  console.log(data)
  return data
}
export {
  fetchAllArticles,
  createArticle,
  fetchArticleByID,
  fetchPublicArticlesIDS,
  fetchPrivateArticlesIDS
}
