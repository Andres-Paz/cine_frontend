import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsuarioStore = defineStore('usuarioStore', () => {
  const { $api } = useNuxtApp()
  const usuario = ref(null)
  const loading = ref(false)

  async function getUsuario(id) {
    loading.value = true
    try {
      const response = await $api(`/usuarios/${id}`, {
        method: 'GET'
      })
      usuario.value = response
      return response
    } catch (error) {
      console.error('Error:', error.message)
      return null
    } finally {
      loading.value = false
    }
  }

  async function postUsuario(data) {
    loading.value = true
    try {
      const response = await $api('/usuarios', {
        method: 'POST',
        body: data
      })
      usuario.value = response
      return response
    } catch (error) {
      console.log(error.data?.message ?? error.name)
      return error
    } finally {
      loading.value = false
    }
  }

  async function postUsuarioPublico(data) {
    loading.value = true
    try {
      const response = await $api('/usuarios/public', {
        method: 'POST',
        body: data
      })
      return response
    } catch (error) {
      console.log(error.data?.message ?? error.name)
      return error
    } finally {
      loading.value = false
    }
  }

  async function putUsuario(id, data) {
    loading.value = true
    try {
      const response = await $api(`/usuarios/${id}`, {
        method: 'PUT',
        body: data
      })
      usuario.value = response
      return response
    } catch (error) {
      console.log(error.data?.message ?? error.name)
      return error
    } finally {
      loading.value = false
    }
  }

  async function deleteUsuario(id) {
    loading.value = true
    try {
      const response = await $api(`/usuarios/${id}`, {
        method: 'DELETE'
      })
      return response
    } catch (error) {
      console.log(error.data?.message ?? error.name)
      return error
    } finally {
      loading.value = false
    }
  }

  return {
    usuario,
    loading,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
    postUsuarioPublico
  }
})
