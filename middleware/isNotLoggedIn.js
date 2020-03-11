export default function({ $cookies, redirect }) {
  try {
    if (!$cookies.get('access_token')) {
      return redirect('/login')
    }
  } catch (e) {}
}
