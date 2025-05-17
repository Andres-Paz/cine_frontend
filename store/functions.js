export const useFunctionsStore = defineStore('functionsStore', () => { 
    const { $api } = useNuxtApp()
    const functions = ref([])
    const loading = ref(false)

    async function getFunctions(pelicula_id=null){
        loading.value = true
        try {
            const response = await $api('/funciones', {
                method: 'GET',
                params: {
                    pelicula_id
                }
            })
            console.log('Response:', response)
            functions.value = response
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }
    return {
        functions,
        loading,
        getFunctions
      }
})