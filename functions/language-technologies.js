import firebase from 'firebase/app'

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
async function updateCategories(categories) {
  try {
    await firebase
      .database()
      .ref(`/systemData/categories/`)
      .set(categories)
  } catch (e) {
    throw e
  }
}

export { fetchCategories, updateCategories }
