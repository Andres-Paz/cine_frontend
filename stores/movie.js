export const useMovieStore = defineStore('movieStore', () => {
    const { $api } = useNuxtApp()
    const movie = ref()
    const loading = ref(false)

    async function getMovie(id) {
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

    async function postMovie(data) {
        loading.value = true
        try {
            await $api('/peliculas', {
                method: 'POST',
                body: data
            })
        } catch (error) {
            console.log(error.data?.message ?? error.name)
        } finally {
            loading.value = false
        }
    }

    async function putMovie(id, data) {
        loading.value = true
        try {
            const response = await $api(`/peliculas/${id}`, {
                method: 'PUT',
                body: data
            })
            item.value = response
        } catch (error) {
            console.log(error.data?.message ?? error.name)
        } finally {
            loading.value = false
        }
    }

    async function deleteMovie(id) {
        loading.value = true
        try {
            await $api(`/peliculas/${id}`, {
                method: 'DELETE'
            })
        } catch (error) {
            console.log(error.data?.message ?? error.name)
        } finally {
            loading.value = false
        }
    }
    return {
        movie,
        loading,
        getMovie,
        postMovie,
        putMovie,
        deleteMovie,
    }
})