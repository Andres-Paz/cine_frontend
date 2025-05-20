<template>
    <div class="bg-gray-100">
        <FunctionActions
          v-model:filter="filter"
          :peliculas="movies"
          :salas="salas"
          :is_admin="user?.role === 'admin' ? true : false"
          item="funcion" 
          @agregar="handleShowCreateDialog"
        />
      <div class="flex flex-wrap justify-center p-4">
        <FunctionAdminCard
          v-for="funcion in filteredFunctions"
          :key="funcion.id"
          :funcion="funcion"
          @modificar="handleShowModDialog(funcion)"
          @eliminar="handleShowElimDialog(funcion.id)"
        />
      </div>
    </div>
    <FunctionForm 
      v-model:open="showCrearFunctionDialog"
      v-model:function-data="newFunction"
      :peliculas="movies"
      :salas="salas"
      @aceptar="handleCrearFunction"
      @cancelar="handleCancelCreateFunction"
    />
    <!--Modificar una sala-->
    <FunctionForm 
      v-model:open="showModFunctionDialog"
      v-model:function-data="modFunction"
      :peliculas="movies"
      :salas="salas"
      @aceptar="handleModFunction"
      @cancelar="handleCancelModFunction"
      edit
    />
    <DialogoEliminar 
      v-model:open="showElimFuncionDialog"
      item="sala"
      @aceptar="handleElimFuncion"
      @cancelar="handleCancelElimFun"
    />
</template>
<script setup>
import FunctionActions from '~/components/functions/FunctionActions.vue';
import FunctionAdminCard from '~/components/functions/FunctionAdminCard.vue';
import FunctionForm from '~/components/functions/FunctionForm.vue';

const { user } = storeToRefs(useAuthStore())
const moviesStore = useMoviesStore()
const { getMovies } = moviesStore
const { movies } = storeToRefs(moviesStore)

const SalasStore = useSalasStore()
const { getSalas } = SalasStore
const { salas } = storeToRefs(SalasStore)

const funcionesStore = useFunctionsStore()
const { getFunctions } = funcionesStore
const { functions } = storeToRefs(funcionesStore)

const functionStore = useFunctionStore()
const {postFunction, putFunction, deleteFunction} = functionStore

const filter = reactive({
  pelicula: '',
  sala: '',
  fecha: ''
})


await useAsyncData('moviesFun', async () => {
    await getMovies()
  })

await useAsyncData('salasFun', async () => {
  await getSalas()
})

await useAsyncData('functionsStore', async () => {
    await getFunctions()
  })


const filteredFunctions = computed(() => {
  return functions.value.filter(f => {
    const matchPelicula = filter.pelicula === '' || f.pelicula_id === filter.pelicula
    const matchSala = filter.sala === '' || f.sala_id === filter.sala
    const matchFecha =
      filter.fecha === '' || new Date(f.fecha).toISOString().split('T')[0] === filter.fecha

    return matchPelicula && matchSala && matchFecha
  })
})

const resetFuncion = () => {
  return {
    fecha: '',
    hora_inicio: '',
    hora_final: '',
    sala_id: null,
    pelicula_id: null
  }
}

/**
 * Creacion de salas
 */
const showCrearFunctionDialog = ref(false)
const newFunction = ref(resetFuncion())

const handleShowCreateDialog = (() => {
  showCrearFunctionDialog.value = true
})

const handleCrearFunction = (async () => {
  try{
    await postFunction(newFunction.value)
  }
  catch(error){
    console.log(error)
  }
  finally {
    newFunction.value = resetFuncion()
    showCrearFunctionDialog.value = false
    await getFunctions()
  }
})

const handleCancelCreateFunction = (() => {
  newFunction.value = resetFuncion()
  showCrearFunctionDialog.value = false
})

/**
 * Modificacion de salas
 */
const showModFunctionDialog = ref(false)
const modFunction = ref(resetFuncion())

const handleShowModDialog = ((functionAux) => {
  modFunction.value = functionAux
  showModFunctionDialog.value = true
})

const handleModFunction = (async () => {
  try{
    await putFunction(modFunction.value.id, modFunction.value)
  }
  catch(error){
    console.log(error)
  }
  finally {
    modFunction.value = resetFuncion()
    showModFunctionDialog.value = false
    await getFunctions()
  }
})

const handleCancelModFunction = (() => {
  modFunction.value = resetFuncion()
  showModFunctionDialog.value = false
})

/**
 * Eliminar una funcion
 */
const showElimFuncionDialog = ref(false)
const idFuncion = ref(null)

const handleShowElimDialog = ((id) => {
  idFuncion.value = id
  showElimFuncionDialog.value = true
})

const handleElimFuncion = (async () => {
  try{
    await deleteFunction(idFuncion.value)
  }
  catch(error){
    console.log(error)
  }
  finally {
    idFuncion.value = null
    showElimFuncionDialog.value = false
    await getFunctions()
  }
})

const handleCancelElimFun = (() => {
  idFuncion.value = null
  showElimFuncionDialog.value = false
})
</script>