export default function({ store, redirect }) {
  try {
    if (store.getters.user.id) {
      return redirect('/')
    }
  } catch (e) {}
}
