export const useFunctionStore = defineStore('functionStore', () => { 
    const { $api } = useNuxtApp()
    const functionRef = ref()
    const loading = ref(false)

    async function getFunction(id){
        loading.value = true
        try {
            const response = await $api(`/funciones/${id}`, {
                method: 'GET'
            })
            functionRef.value = response
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }
    return {
        functionRef,
        loading,
        getFunction
      }
})