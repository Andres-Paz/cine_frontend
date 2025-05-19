<template>
    <div class="bg-gray-100">
      <AppActions
        v-model:search="search" 
        :is_admin="user?.role === 'admin' ? true : false"
        item="pelicula" 
        @agregar="handleShowDialogCreatePelicula"
      />
  
      <div class="flex flex-wrap justify-center p-4">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
          :is_admin="user?.role === 'admin' ? true : false"
          @modificar="handleShowDialogModPelicula(movie)"
          @eliminar="handleShowDialogElimPelicula(movie.id)"
        />
      </div>
    </div>
    <Dialog 
      v-model:open="showDialogCreatePelicula"
      :title="`Crear Pelicula`"
      @aceptar="handleCreatePelicula"
      @cancelar="handleCloseDialogCreatePelicula"
      :aceptar-text="`Crear`"
    >
      <PeliculaForm v-model:pelicula-data="newPelicula"/>
    </Dialog>
    <Dialog 
      v-model:open="showDialogModPelicula"
      :title="`Modificar Pelicula`"
      @aceptar="handleModPelicula"
      @cancelar="handleCloseDialogModPelicula"
      :aceptar-text="`Modificar`"
    >
      <PeliculaForm v-model:pelicula-data="modPelicula"/>
    </Dialog>
    <DialogoEliminar 
      v-model:open="showDialogElimPelicula"
      item="pelicula"
      @aceptar="handleElimPelicula"
      @cancelar="handleCloseDialogElimPelicula"
    />
  </template>
  
  <script setup>
  import Dialog from '~/components/Dialog.vue'
import MovieCard from '~/components/movies/MovieCard.vue'

  const { user } = storeToRefs(useAuthStore())
  const moviesStore = useMoviesStore()
  const { getMovies } = moviesStore
  const { movies } = storeToRefs(moviesStore)

  const { getMovie, postMovie, putMovie, deleteMovie } = useMovieStore()
  
  const search = ref('')
  
  const filteredMovies = computed(() =>
    movies.value.filter(movie =>
      movie.nombre.toLowerCase().includes(search.value.toLowerCase())
    )
  )
  
  useAsyncData('movies', async () => {
    await getMovies()
  })

  const resetPelicula = () => {
    return {
      nombre: '',
      duracion: '',
      clasificacion: '',
      imagen: '',
      fecha_inicio: '',
      fecha_fin: '',
      is_active: true,
    }
  }

  // Crear pelicula
  const showDialogCreatePelicula = ref(false)
  const newPelicula = ref(resetPelicula())

  const handleShowDialogCreatePelicula = () => {
    showDialogCreatePelicula.value = true
  }

  const handleCreatePelicula = async () => {
    try{
      await postMovie(newPelicula.value)
    }
    catch (error) {
      console.error('Error creating movie:', error)
    }
    finally {
      await getMovies()
      showDialogCreatePelicula.value = false
      newPelicula.value = resetPelicula()
    }
  }

  const handleCloseDialogCreatePelicula = () => {
    showDialogCreatePelicula.value = false
    newPelicula.value = resetPelicula()
  }

  // modificar pelicula
  const showDialogModPelicula = ref(false)
  const modPelicula = ref(resetPelicula())

  const handleShowDialogModPelicula = (pelicula) => {
    pelicula.fecha_inicio = new Date(pelicula.fecha_inicio).toISOString().split('T')[0]
    pelicula.fecha_fin = new Date(pelicula.fecha_fin).toISOString().split('T')[0]
    modPelicula.value = pelicula
    showDialogModPelicula.value = true
  }

  const handleModPelicula = async () => {
    try{
      await putMovie(modPelicula.value.id, modPelicula.value)
    }
    catch (error) {
      console.error('Error creating movie:', error)
    }
    finally {
      await getMovies()
      showDialogModPelicula.value = false
      modPelicula.value = resetPelicula()
    }
  }

  const handleCloseDialogModPelicula = () => {
    showDialogModPelicula.value = false
    modPelicula.value = resetPelicula()
  }

  // eliminar pelicula
  const showDialogElimPelicula = ref(false)
  const idPelicula = ref(null)

  const handleShowDialogElimPelicula = (id) => {
    idPelicula.value = id
    showDialogElimPelicula.value = true
  }

  const handleElimPelicula = async () => {
    try{
      await deleteMovie(idPelicula.value)
    }
    catch (error) {
      console.error('Error creating movie:', error)
    }
    finally {
      await getMovies()
      showDialogElimPelicula.value = false
      idPelicula.value = null
    }
  }

  const handleCloseDialogElimPelicula = () => {
    showDialogElimPelicula.value = false
    idPelicula.value = null
  }

  

  </script>
  