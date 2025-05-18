<template>
    <div class="bg-gray-100">
      <AppActions
        v-model:search="search" 
        :is_admin="user?.role === 'admin' ? true : false"
        item="pelicula" 
      />
  
      <div class="flex flex-wrap justify-center p-4">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
          :is_admin="user?.role === 'admin' ? true : false"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import MovieCard from '~/components/movies/MovieCard.vue'

  const { user } = storeToRefs(useAuthStore())
  const moviesStore = useMoviesStore()
  const { getMovies } = moviesStore
  const { movies } = storeToRefs(moviesStore)
  
  const search = ref('')
  
  const filteredMovies = computed(() =>
    movies.value.filter(movie =>
      movie.nombre.toLowerCase().includes(search.value.toLowerCase())
    )
  )
  
  useAsyncData('movies', async () => {
    await getMovies()
  })
  </script>
  