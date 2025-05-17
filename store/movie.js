export const useMovieStore = defineStore('movieStore', () => { 
    const { $api } = useNuxtApp()
    const movie = ref()
    const loading = ref(false)

    async function getMovie(id){
        loading.value = true
        try {
            const response = await $api(`/peliculas/${id}`, {
                method: 'GET'
            })
            movie.value = response
            return response
        } catch (error) {
            console.error('Error:', error.message)
            return null
        } finally {
            loading.value = false
        }
    }
    return {
        movie,
        loading,
        getMovie
      }
})