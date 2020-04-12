import firebase from 'firebase/app'

/**
 * Functions to control repositories
 * This functions is used in many pages. That is why their logic is in separate module.
 * @external functions_repositories
 */

/**
 * @memberOf external:functions_repositories
 * @returns {Promise<Object>} - returns all repositories
 */
async function fetchAllRepositories() {
  return (
    await firebase
      .database()
      .ref(`/3_repositories/`)
      .once('value')
  ).val()
}

/**
 * @memberOf external:functions_repositories
 * @param data {Object} - create repository with data
 * @returns {Promise<string>} -returns id of new repository
 */
async function createRepository(data) {
  try {
    const push = await firebase
      .database()
      .ref(`/3_repositories/`)
      .push(data)
    if (data.isPublic) {
      const item =
        (
          await firebase
            .database()
            .ref(`/systemData/public/repositories/`)
            .once('value')
        ).val() || []
      item.push(push.key)
      await firebase
        .database()
        .ref(`/systemData/public/repositories`)
        .set(item)
    }
    return push.key
  } catch (e) {
    console.log(`Error in creation new repository: ${e}`)
  }
}

/**
 * @memberOf external:functions_repositories
 * @param data {Object} - new data to update repository
 * @param id {string} - id repository to target to update
 * @returns {Promise<void>}
 */
async function updateRepository(data, id) {
  try {
    await firebase
      .database()
      .ref(`/3_repositories/${id}`)
      .set(data)
  } catch (e) {
    console.log(`Error in updating repository: ${e}`)
  }
}

/**
 * @memberOf external:functions_repositories
 * @param id {string} - id of fetched repository
 * @returns {Promise<Object>} - returns object of fetched repository
 */
async function fetchRepositoryByID(id) {
  return (
    await firebase
      .database()
      .ref(`/3_repositories/${id}/`)
      .once('value')
  ).val()
}
export {
  fetchAllRepositories,
  createRepository,
  updateRepository,
  fetchRepositoryByID
}
