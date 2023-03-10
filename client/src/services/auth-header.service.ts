interface Storage {
  token?: string
}

export default function authHeader() {
  const userStr = localStorage.getItem('user')
  let user: Storage = {}
  if (userStr) user = JSON.parse(userStr)

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token }
  } else {
    return { Authorization: '' }
  }
}
