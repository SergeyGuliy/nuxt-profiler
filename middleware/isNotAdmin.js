export default function({ store, redirect }) {
  try {
    if (!store.getters.user.isAdmin) {
      console.log('Is not admin')
      return redirect('/')
    }
  } catch (e) {
    console.log(e)
  }
}
