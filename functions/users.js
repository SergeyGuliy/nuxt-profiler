/**
 * Functions to control users
 * This functions is used in many pages. That is why their logic is in separate module.
 * @external functions_users
 */
import firebase from 'firebase/app'

/** Function returns object of all users
 * @function
 * @memberOf external:functions_users
 * @returns {Promise<Object>}
 * @export
 */
async function fetchAllUsers() {
  return (
    await firebase
      .database()
      .ref(`/1_users/`)
      .once('value')
  ).val()
}

/** Function returns object of users info
 * @memberOf external:functions_users
 * @param id {string}
 * @returns {Promise<Object>}
 * @export
 */
async function fetchUserByID(id) {
  return (
    await firebase
      .database()
      .ref(`/1_users/${id}/`)
      .once('value')
  ).val()
}

export { fetchAllUsers, fetchUserByID }
