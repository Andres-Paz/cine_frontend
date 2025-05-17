export default defineNuxtPlugin((nuxtApp) => {
    const setToken = (token) => {
      const cookie = useCookie('token')
      cookie.value = token
    }
  
    const getToken = () => {
      const cookie = useCookie('token')
      return cookie.value
    }
  
    nuxtApp.provide('authCookie', {
      setToken,
      getToken
    })
  })
  