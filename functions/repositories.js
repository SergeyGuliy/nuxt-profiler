import firebase from 'firebase'

async function fetchAllRepositories() {
  const data =
    (
      await firebase
        .database()
        .ref(`/3_repositories/`)
        .once('value')
    ).val() || {}
  console.log(data)
  return data
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
  const data =
    (
      await firebase
        .database()
        .ref(`/3_repositories/${id}/`)
        .once('value')
    ).val() || {}
  console.log(data)
  return data
}
async function fetchPublicRepositoriesIDS() {
  const data =
    (
      await firebase
        .database()
        .ref(`/systeData/public/repositories`)
        .once('value')
    ).val() || []
  console.log(data)
  return data
}
async function fetchPrivateRepositoriesIDS(userID) {
  const data =
    (
      await firebase
        .database()
        .ref(`/1_users/${userID}/repositories`)
        .once('value')
    ).val() || []
  console.log(data)
  return data
}
export {
  fetchAllRepositories,
  createRepository,
  fetchRepositoryByID,
  fetchPublicRepositoriesIDS,
  fetchPrivateRepositoriesIDS
}
