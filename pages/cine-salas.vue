<template>
    <div class="bg-gray-100">
        <AppActions 
          v-model:search="search"
          :is_admin="user?.role === 'admin' ? true : false"
          item="sala" 
          @agregar="handleShowCreateDialog"
        />
      <div class="flex flex-wrap justify-center p-4">
        <SalaCard
          v-for="sala in filteredSalas"
          :key="sala.id"
          :sala="sala"
          @modificar="handleShowModDialog(sala)"
          @eliminar="handleShowElimDialog(sala.id)"
        />
      </div>
    </div>
    <SalaForm 
      v-model:open="showCrearSalaDialog"
      v-model:sala-data="newSala"
      @aceptar="handleCrearSala"
      @cancelar="handleCancelCreateSala"
    />
    <!--Modificar una sala-->
    <SalaForm 
      v-model:open="showModSalaDialog"
      v-model:sala-data="modSala"
      @aceptar="handleModSala"
      @cancelar="handleCancelModSala"
      edit
    />
    <DialogoEliminar 
      v-model:open="showElimSalaDialog"
      item="sala"
      @aceptar="handleElimSala"
      @cancelar="handleCancelElimSala"
    />
</template>
<script setup>
import AppActions from '~/components/AppActions.vue';
import SalaCard from '~/components/salas/SalaCard.vue';
import SalaForm from '~/components/salas/SalaForm.vue';
import DialogoEliminar from '~/components/DialogoEliminar.vue';

const { user } = storeToRefs(useAuthStore())

const salaStore = useSalaStore()

const {postSala, putSala, deleteSala} = salaStore
const SalasStore = useSalasStore()
const { getSalas } = SalasStore
const { salas } = storeToRefs(SalasStore)

const search = ref('')

await useAsyncData('salasStore', async () => {
  await getSalas()
})  

const filteredSalas = computed(() =>
    salas.value.filter(sala =>
      sala.nombre.toLowerCase().includes(search.value.toLowerCase())
    )
  )

const resetSala = () => {
  return {
    nombre: '',
    filas: 4,
    columnas: 4,
    cupo: 16,
    tipo: '2D'
  }
}

/**
 * Creacion de salas
 */
const showCrearSalaDialog = ref(false)
const newSala = ref(resetSala())

const handleShowCreateDialog = (() => {
  showCrearSalaDialog.value = true
})

const handleCrearSala = (async () => {
  try{
    await postSala(newSala.value)
  }
  catch(error){
    console.log(error)
  }
  finally {
    newSala.value = resetSala()
    showCrearSalaDialog.value = false
    await getSalas()
  }
})

const handleCancelCreateSala = (() => {
  newSala.value = resetSala()
  showCrearSalaDialog.value = false
})

/**
 * Modificacion de salas
 */
const showModSalaDialog = ref(false)
const modSala = ref(resetSala())

const handleShowModDialog = ((sala) => {
  modSala.value = sala
  showModSalaDialog.value = true
})

const handleModSala = (async () => {
  try{
    await putSala(modSala.value.id, modSala.value)
  }
  catch(error){
    console.log(error)
  }
  finally {
    modSala.value = resetSala()
    showModSalaDialog.value = false
    await getSalas()
  }
})

const handleCancelModSala = (() => {
  modSala.value = resetSala()
  showModSalaDialog.value = false
})

/**
 * Eliminar una sala
 */
const showElimSalaDialog = ref(false)
const idSala = ref(null)

const handleShowElimDialog = ((id) => {
  idSala.value = id
  showElimSalaDialog.value = true
})

const handleElimSala = (async () => {
  try{
    await deleteSala(idSala.value)
  }
  catch(error){
    console.log(error)
  }
  finally {
    idSala.value = null
    showElimSalaDialog.value = false
    await getSalas()
  }
})

const handleCancelElimSala = (() => {
  idSala.value = null
  showElimSalaDialog.value = false
})
</script>