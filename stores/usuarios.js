import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsuariosStore = defineStore('usuariosStore', () => {
  const { $api } = useNuxtApp()
  const usuarios = ref([])
  const loading = ref(false)

  async function getUsuarios() {
    loading.value = true
    try {
      const response = await $api('/usuarios', {
        method: 'GET'
      })
      usuarios.value = response // ajusta si viene en otro campo, ej response.data
      return response
    } catch (error) {
      console.error('Error:', error.message)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    usuarios,
    loading,
    getUsuarios,
  }
})
