export default defineNuxtPlugin((nuxtApp) => {
  const api = async (url: string, options: any = {}) => {
    const token = useCookie('token').value
    options.headers = {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : ''
    }

    return await $fetch(url, {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      ...options
    })
  }

  return {
    provide: {
      api
    }
  }
})
