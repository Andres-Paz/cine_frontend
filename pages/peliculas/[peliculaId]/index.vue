<template>
    <div class="flex h-screen overflow-hidden">
      <!-- Card izquierda -->
      <div v-if="movie" class="w-[400px] bg-white shadow-xl p-6 overflow-y-auto">
        <h1 class="text-2xl font-bold mb-4">{{ movie.nombre }}</h1>
        <img :src="movie.imagen" alt="Poster" class="rounded-lg mb-4" />
        <p><strong>Duración:</strong> {{ movie.duracion }} min</p>
        <p><strong>Clasificación:</strong> {{ movie.clasificacion }}</p>
  
        <hr class="my-4" />
  
        <p class="mb-2 font-semibold">Fecha de hoy: {{ fechaHoy }}</p>
  
        <!-- Date Picker -->
        <label class="block font-semibold mb-1">Selecciona una fecha:</label>
        <input
          type="date"
          v-model="filtros.fecha"
          :min="fechaHoy"
          :max="fechaMaxima"
          class="border rounded px-2 py-1 mb-4"
        />
  
        <!-- Select de horarios -->
        <label class="block font-semibold mb-1">Selecciona una hora:</label>
        <select v-model="filtros.hora" class="border rounded px-2 py-1 mb-4 w-full">
            <option value="">Ver todas</option> <!-- Opción por defecto -->
            <option
                v-for="hora in horasDisponibles"
                :key="hora"
                :value="hora"
                v-if="hora !== ''"
            >
                {{ hora }}
            </option>
        </select>


  
        <!-- Checkbox 2D y 3D -->
        <div class="flex items-center gap-4 mb-4">
          <label class="flex items-center gap-1">
            <input type="checkbox" value="2D" v-model="filtros.formatos" />
            2D
          </label>
          <label class="flex items-center gap-1">
            <input type="checkbox" value="3D" v-model="filtros.formatos" />
            3D
          </label>
        </div>
      </div>
  
      <!-- Cards del lado derecho -->
    <div class="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            <FunctionCard
            v-for="funcion in funcionesFiltradas"
            :key="funcion.id"
            :funcion="funcion"
            :tipoPelicula="funcion.tipo"
            @comprar="handleReservaciones"
            />
        </div>
    </div>

    </div>
  </template>
  
  <script setup>

  import FunctionCard from '~/components/functions/FunctionCard.vue'

const movieStore = useMovieStore()
const { getMovie } = movieStore
const { movie } = storeToRefs(movieStore)

const funcionesStore = useFunctionsStore()
const { getFunctions } = funcionesStore
const { functions } = storeToRefs(funcionesStore)

const route = useRoute()
onMounted(async ()=>{
    await Promise.all([getMovie(route.params.peliculaId), getFunctions(route.params.peliculaId)])
})
  
  // Fecha hoy y límite
  const hoy = new Date()
  const fechaHoy = hoy.toISOString().split('T')[0]
  const fechaMax = new Date()
  fechaMax.setDate(hoy.getDate() + 6) // solo se puede elegir hasta 6 días más
  const fechaMaxima = fechaMax.toISOString().split('T')[0]
  
  // Horas disponibles calculadas por duración
  const horasDisponibles = computed(() => {
  return functions.value
    .filter(f => f.fecha.slice(0, 10) === filtros.value.fecha) // solo funciones de la fecha seleccionada
    .map(f => f.hora_inicio.slice(0, 5)) // extrae "HH:MM"
    .filter((value, index, self) => self.indexOf(value) === index) // elimina duplicados
    .sort(); // ordena cronológicamente
});

  // Filtros
  const filtros = ref({
    fecha: fechaHoy,
    hora: '',
    formatos: [],
  })
  
  
  // Filtro dinámico con computed
  const funcionesFiltradas = computed(() => {
  return functions.value.filter((f) => {
    // Convertir fecha ISO a formato YYYY-MM-DD local
    const fechaFuncion = new Date(f.fecha).toISOString().split('T')[0]
    
    // Normalizar hora (aseguramos que esté en formato "HH:mm")
    const horaFuncion = f.hora_inicio?.slice(0, 5)

    const cumpleFecha = fechaFuncion === filtros.value.fecha
    const cumpleHora = !filtros.value.hora || horaFuncion === filtros.value.hora
    const cumpleFormato =
      filtros.value.formatos.length === 0 || filtros.value.formatos.includes(f.sala_tipo)

    return cumpleFecha && cumpleHora && cumpleFormato
  })
})

const router = useRouter()
const handleReservaciones = (id) => {
    router.push(`/peliculas/${route.params.peliculaId}/reservaciones/${id}`)
    //navigateTo(`/peliculas/${route.params.peliculaId}/reservaciones/${id}`)
  }

  </script>
  
  <style>
  body {
    margin: 0;
    font-family: sans-serif;
  }
  </style>
  