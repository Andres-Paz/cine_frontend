export const useMoviesStore = defineStore('moviesStore', () => { 
    const { $api } = useNuxtApp()
    const movies = ref([])
    const loading = ref(false)

    async function getMovies(){
        loading.value = true
        try {
            const response = await $api('/peliculas', {
                method: 'GET'
            })
            movies.value = response
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }
    return {
        movies,
        loading,
        getMovies
      }
})