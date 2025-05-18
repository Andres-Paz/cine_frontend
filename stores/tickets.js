export const useTicketsStore = defineStore('ticketsStore', () => { 
    const { $api } = useNuxtApp()
    const tickets = ref([])
    const loading = ref(false)

    async function getTickets(funciones_id=null){
        loading.value = true
        try {
            const response = await $api('/reservas', {
                method: 'GET', 
                params: {
                    funciones_id
                }
            })
            tickets.value = response
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }
    return {
        tickets,
        loading,
        getTickets
      }
})