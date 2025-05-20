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
    async function postFunction(data){
        loading.value = true
        try {
            const response = await $api(`/funciones`, {
                method: 'POST',
                body: data
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
    async function putFunction(data){
        loading.value = true
        try {
            const response = await $api(`/funciones`, {
                method: 'PUT',
                body: data
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
    async function deleteFunction(id, data){
        loading.value = true
        try {
            const response = await $api(`/funciones/${id}`, {
                method: 'DELETE',
                body: data
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
        functionRef,
        loading,
        getFunction,
        postFunction,
        putFunction,
        deleteFunction
      }
})