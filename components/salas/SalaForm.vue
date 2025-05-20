<template>
  <Dialog
    v-model:open="isOpen"
    :titulo="edit ? 'Modificar sala' : 'Crear sala'"
    :aceptar-text="edit ? 'Modificar' : 'Crear'"
    @aceptar="$emit('aceptar')"
    @cancelar="$emit('cancelar')"
    movie-form
  >
    <div class="flex flex-row gap-6 w-full h-[50vh] p-0.5">
      <!-- Formulario -->
      <form class="flex flex-wrap w-64 space-y-4 overflow-y-auto pr-2">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            v-model="salaData.nombre"
            class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Sala 1"
          />
        </div>
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Filas</label>
            <input
              type="number"
              v-model.number="salaData.filas"
              min="1"
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: 5"
            />
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Columnas</label>
            <input
              type="number"
              v-model.number="salaData.columnas"
              min="1"
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: 8"
            />
          </div>
        </div>
        <div>
           <label class="block text-sm font-medium text-gray-700 mb-1">Cupo:</label>
            <input
              type="number"
              v-model.number="salaData.cupo"
              min="1"
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: 8"
              readonly
            />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de sala</label>
          <select
            v-model="salaData.tipo"
            class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecciona un tipo</option>
            <option value="3D">3D</option>
            <option value="2D">2D</option>
          </select>
        </div>
      </form>

      <!-- Vista previa -->
      <div class="flex flex-col items-center justify-center border rounded-lg p-4 bg-gray-50 overflow-hidden max-h-[100%] w-full">
        <p class="text-sm text-gray-600 font-medium mb-3">Vista previa de la sala:</p>
        <div class="w-full justify-center overflow-auto">
          <CineSalaView
            :columnas="salaData.columnas"
            :filas="salaData.filas"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '../Dialog.vue'
import CineSalaView from '../CineSalaView.vue'

const isOpen = defineModel('open', {
  type: Boolean,
  required: true,
  default: false
})

const salaData = defineModel('salaData', {
  type: Object,
  required: true,
  default: () => ({
    nombre: '',
    filas: 5,
    columnas: 5,
    cupo: 25,
    tipo: ''
  })
})

defineProps({
  edit:{
    type: Boolean,
    default: false
  }
})

defineEmits(['aceptar', 'cancelar'])

watch(salaData.value, ()=> {
  salaData.value.cupo = salaData.value.filas * salaData.value.columnas
})
</script>
