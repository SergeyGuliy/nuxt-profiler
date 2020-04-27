import firebase from 'firebase/app'
/**
 * Functions is reusable in many pages. Map:
 * - [language-technologies.js]{@link external:functions_language_technologies}   -This functions controls logic with fetching languages and update languages.
 * - [articles.js]{@link external:functions_articles}                             -This functions controls logic with fetching all, fetching by id, creating, updating articles.
 * - [repositories.js]{@link external:functions_repositories}                     -This functions controls logic with fetching all, fetching by id, creating, updating repositories.
 * - [users.js]{@link external:functions_users}                                   -This functions controls logic with fetching all, fetching by id users.
 * @namespace functions
 */

/**
 * Functions to control languages/technologies
 * This functions is used in many pages. That is why their logic is in separate module.
 * @external functions_language_technologies
 */

/**
 * Fetch all categories from database
 * @memberOf external:functions_language_technologies
 * @returns {Promise<any | {}>}
 */
async function fetchCategories() {
  return (
    (
      await firebase
        .database()
        .ref(`/systemData/categories/`)
        .once('value')
    ).val() || {}
  )
}

/**
 * Upload all categories to database
 * @memberOf external:functions_language_technologies
 * @param categories {Object} - List updated languages
 * @returns {Promise<void>}
 */
async function updateCategories(categories) {
  try {
    await firebase
      .database()
      .ref(`/systemData/categories/`)
      .set(categories)
  } catch (e) {
    console.log(`Error in updating lang/tech list: ${e}`)
  }
}
export { fetchCategories, updateCategories }
