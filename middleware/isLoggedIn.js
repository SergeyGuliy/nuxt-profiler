export default function({ store, redirect }) {
  try {
    if (store.getters.user.id) {
      console.log('Is Logged in')
      return redirect('/')
    }
  } catch (e) {
    console.log(e)
  }
}
