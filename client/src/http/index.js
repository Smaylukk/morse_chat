import axios from 'axios'

// для публічного АПІ
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

// тільки для АПІ з авторизацією
const $authhost = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

// автоматичне встановлення заголовку авторизації
const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authhost.interceptors.request.use(authInterceptor)

export {
  $host,
  $authhost
}