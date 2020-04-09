import firebase from 'firebase/app'

async function fetchAllRepositories() {
  return (
    (
      await firebase
        .database()
        .ref(`/3_repositories/`)
        .once('value')
    ).val() || {}
  )
}
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
    console.log(e)
  }
}
async function updateRepository(data, id) {
  try {
    await firebase
      .database()
      .ref(`/3_repositories/${id}`)
      .set(data)
  } catch (e) {
    console.log(e)
  }
}
async function fetchRepositoryByID(id) {
  try {
    return (
      await firebase
        .database()
        .ref(`/3_repositories/${id}/`)
        .once('value')
    ).val()
  } catch (e) {
    throw Error
  }
}
async function fetchPrivateRepositoriesIDS(userID) {
  return (
    (
      await firebase
        .database()
        .ref(`/1_users/${userID}/repositories`)
        .once('value')
    ).val() || []
  )
}
export {
  fetchAllRepositories,
  createRepository,
  updateRepository,
  fetchRepositoryByID,
  fetchPrivateRepositoriesIDS
}
