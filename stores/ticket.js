export const useTicketStore = defineStore('ticketStore', () => {
    const { $api } = useNuxtApp()
    const ticket = ref()
    const loading = ref(false)

    async function getTicket(id) {
        loading.value = true
        try {
            const response = await $api(`/reservas/${id}`, {
                method: 'GET'
            })
            ticket.value = response
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }

    async function postTicket(data) {
        loading.value = true
        try {
            const response = await $api('/reservas', {
                method: 'POST',
                body: data
            })
            ticket.value = response
            return response
        } catch (error) {
            console.log(error.data?.message ?? error.name)
            return error
        } finally {
            loading.value = false
        }
    }

    
    return {
        ticket,
        loading,
        getTicket,
        postTicket,
    }
})