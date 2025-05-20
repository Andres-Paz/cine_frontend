import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticketStore', () => {
  const ticket = ref(null)
  const loading = ref(false)

  // Obtener un ticket por ID
  const getTicket = async (id) => {
    loading.value = true
    try {
      const response = await $api.get(`/tickets/${id}`)
      ticket.value = response.data
    } catch (error) {
      console.error('Error al obtener el ticket:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Crear un nuevo ticket
  const postTicket = async (data) => {
    loading.value = true
    try {
      const response = await $api.post('/tickets', data)
      return response.data
    } catch (error) {
      console.error('Error al crear el ticket:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    ticket,
    loading,
    getTicket,
    postTicket
  }
})
