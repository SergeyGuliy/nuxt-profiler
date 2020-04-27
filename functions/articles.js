import firebase from 'firebase/app'

/**
 * Functions to control articles
 * This functions is used in many pages. That is why their logic is in separate module.
 * @external functions_articles
 */

/**
 * @memberOf external:functions_repositories
 * @returns {Promise<Object>} - returns all repositories
 */
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

/**
 * @memberOf external:functions_articles
 * @param data {Object} - create article with data
 * @returns {Promise<string>} -returns id of new article
 */
async function createArticle(data) {
  try {
    const push = await firebase
      .database()
      .ref(`/2_articles/`)
      .push(data)
    return push.key
  } catch (e) {
    console.log(`Error in creation new article: ${e}`)
  }
}

/**
 * @memberOf external:functions_articles
 * @param data {Object} - new data to update article
 * @param id {string} - id article to target to update
 * @returns {Promise<void>}
 */
async function updateArticle(data, id) {
  try {
    await firebase
      .database()
      .ref(`/2_articles/${id}`)
      .set(data)
  } catch (e) {
    console.log(`Error in updating article: ${e}`)
  }
}

/**
 * @memberOf external:functions_articles
 * @param id {string} - id of fetched articles
 * @returns {Promise<Object>} - returns object of fetched article
 */
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
export { fetchAllArticles, createArticle, updateArticle, fetchArticleByID }
