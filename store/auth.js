// stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()
  const user = ref(null)
  const token = ref(null)
  const errors = ref(null)
  const loading = ref(false)

  async function login(credentials) {
    loading.value = true
    errors.value = null

    try {
      const { setToken } = useNuxtApp().$authCookie
      let authToken = ''
      const response = await $api('/auth/login', {
        method: 'POST',
        body: credentials,
        onResponse({ response }) {
          if (response.headers.get('Authorization')) {
            authToken = response.headers
              .get('Authorization')
              ?.replace('Bearer ', '')
          } else if (response.headers.get('x-amzn-remapped-authorization')) {
            authToken = response.headers
              .get('x-amzn-remapped-authorization')
              ?.replace('Bearer ', '')
          }
	        token.value = authToken
          setToken(token.value)
        }
      })
      user.value = response
      console.log('Usuario logueado:', user.value)
      navigateTo('/peliculas')
      return response
    } catch (error) {
      console.error('Error en login:', error.message)
      errors.value = error.message
      return null
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    errors.value = null
    const { setToken } = useNuxtApp().$authCookie
    setToken(null)
    navigateTo('/login')
  }

  function setTokenValue(value) {
    token.value = value
  }

  return {
    user,
    token,
    errors,
    loading,
    login,
    logout,
    setToken: setTokenValue,
  }
})
