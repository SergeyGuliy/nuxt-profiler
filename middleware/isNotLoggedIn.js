export default function({ store, redirect }) {
  try {
    if (!store.getters.user || !store.getters.user.id) {
      return redirect('/login')
    }
  } catch (e) {}
}
