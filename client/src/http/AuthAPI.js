import { $authhost, $host } from './index';


export const signIn = async (username, password) => {
  const { data, status} = await $host.post('api/auth/signIn', {username, password})
  if (status === 200) {
    localStorage.setItem('token', data)

    return data
  } else {
    throw new Error(data.message)
  }
}

export const check = async () => {
  const { data, status} = await $authhost.get('api/auth/checkAuth')
  if (status === 200) {
    localStorage.setItem('token', data)

    return data
  } else {
    throw new Error(data.message)
  }
}