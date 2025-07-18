export const useSalaStore = defineStore('SalaStore', () => { 
    const { $api } = useNuxtApp()
    const sala = ref()
    const loading = ref(false)

    async function getSala(id){
        loading.value = true
        try {
            const response = await $api(`/salas/${id}`, {
                method: 'GET'
            })
            sala.value = response
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }
    async function postSala(data){
        loading.value = true
        try {
            const response = await $api(`/salas`, {
                method: 'POST',
                body: data
            })
            sala.value = response
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }
    async function putSala(id, data){
        loading.value = true
        try {
            const response = await $api(`/salas/${id}`, {
                method: 'PUT',
                body: data
            })
            sala.value = response
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }
    async function deleteSala(id){
        loading.value = true
        try {
            const response = await $api(`/salas/${id}`, {
                method: 'DELETE'
            })
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }
    return {
        sala,
        loading,
        getSala,
        postSala,
        putSala,
        deleteSala,
      }
})