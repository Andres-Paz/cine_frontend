<template>
    <div class="min-h-screen bg-gray-100">
      <div class="flex justify-between items-center p-4">
        <h2 class="text-xl font-semibold">Bienvenido {{ user?.perfil?.nombre }}</h2>
        <input
          v-model="search"
          type="text"
          placeholder="Buscar película..."
          class="p-2 border rounded w-64"
        />
      </div>
  
      <div class="flex flex-wrap justify-center p-4">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import MovieCard from '@/components/movies/MovieCard.vue'
  import { useAuthStore } from '@/store/auth'
  import { useMoviesStore } from '@/store/movies'
  
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
  