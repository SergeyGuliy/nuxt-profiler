export default function({ store, redirect }) {
  try {
    if (!store.getters.user) {
      return redirect('/')
    }
  } catch (e) {}
}
