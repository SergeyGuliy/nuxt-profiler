export default function({ store, redirect }) {
  try {
    if (!store.getters.user || !store.getters.user.id) {
      console.log('Not Logged in')
      return redirect('/login')
    }
  } catch (e) {
    console.log(e)
  }
}
