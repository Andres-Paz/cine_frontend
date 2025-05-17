export const useSalasStore = defineStore('salasStore', () => { 
    const { $api } = useNuxtApp()
    const salas = ref([])
    const loading = ref(false)

    async function getSalas(){
        loading.value = true
        try {
            const response = await $api('/salas', {
                method: 'GET'
            })
            salas.value = response
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }
    return {
        salas,
        loading,
        getSalas
      }
})