import { $authhost, $host } from './index';


export const getAllUsers = async () => {
  const { data, status} = await $authhost.get('api/user')
  if (status === 200) {
    return data
  } else {
    throw new Error(data.message)
  }
}

export const getOneUser = async (userId) => {
  const { data, status} = await $authhost.get('api/user/' + userId)
  if (status === 200) {
    return data
  } else {
    throw new Error(data.message)
  }
}

export const createUser = async (user) => {
  const { data } = await $authhost.post('api/user', user)

  return data
}

export const changeUser = async (id, user) => {
  const { data } = await $authhost.put('api/user/' + id, user)

  return data
}

export const deleteUser = async (id) => {
  const { data } = await $authhost.delete('api/user/' + id)

  return data
}