interface Storage {
  accessToken?: string
}

export default function authHeader() {
  const userStr = localStorage.getItem('user')
  let user: Storage = {}
  if (userStr) user = JSON.parse(userStr)

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken }
  } else {
    return { 'x-access-token': null }
  }
}
