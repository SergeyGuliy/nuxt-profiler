import firebase from 'firebase'

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
  const push = await firebase
    .database()
    .ref(`/3_repositories/`)
    .push(data)
  if (data.accessibility === 'public') {
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
}
async function fetchRepositoryByID(id) {
  return (
    (
      await firebase
        .database()
        .ref(`/3_repositories/${id}/`)
        .once('value')
    ).val() || {}
  )
}
async function fetchPublicRepositoriesIDS() {
  return (
    (
      await firebase
        .database()
        .ref(`/systemData/public/repositories`)
        .once('value')
    ).val() || []
  )
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
  fetchRepositoryByID,
  fetchPublicRepositoriesIDS,
  fetchPrivateRepositoriesIDS
}
