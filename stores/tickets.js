export const useTicketsStore = defineStore('ticketsStore', () => { 
    const { $api } = useNuxtApp()
    const tickets = ref([])
    const loading = ref(false)

    async function getTickets(funciones_id=null, perfil_id=null){
        const params = {}
        if (funciones_id !== null && funciones_id !== undefined) {
        params.funciones_id = funciones_id
        }
        if (perfil_id !== null && perfil_id !== undefined) {
        params.perfil_id = perfil_id
}
        loading.value = true
        try {
            const response = await $api('/reservas', {
                method: 'GET', 
                params: params
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