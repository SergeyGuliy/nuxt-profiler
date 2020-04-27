export default function({ store, redirect }) {
  try {
    if (!store.getters.isAdmin) {
      return redirect('/')
    }
  } catch (e) {
    console.log(e)
  }
}
