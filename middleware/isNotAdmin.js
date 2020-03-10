export default function({ store, redirect }) {
  try {
    if (!store.getters.user.isAdmin) {
      return redirect('/')
    }
  } catch (e) {}
}
