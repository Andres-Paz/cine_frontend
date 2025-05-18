<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          v-model="localData.nombre"
          type="text"
          required
          class="w-full mt-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
  
      <!-- Duración -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Duración (minutos)</label>
        <input
          v-model="localData.duracion"
          type="number"
          required
          class="w-full mt-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
  
      <!-- Clasificación -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Clasificación</label>
        <input
          v-model="localData.clasificacion"
          type="text"
          required
          class="w-full mt-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
  
      <!-- Imagen -->
      <div>
        <label class="block text-sm font-medium text-gray-700">URL de Imagen</label>
        <input
          v-model="localData.imagen"
          type="url"
          required
          class="w-full mt-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
  
      <!-- Fecha de Inicio -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
        <input
          v-model="localData.fecha_inicio"
          type="date"
          required
          class="w-full mt-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
  
      <!-- Fecha de Fin -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Fecha de Fin</label>
        <input
          v-model="localData.fecha_fin"
          type="date"
          required
          class="w-full mt-1 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
  
      <!-- Botón para enviar -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { reactive, toRefs, watch } from 'vue'
  
  const props = defineProps({
    peliculaData: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['submit'])
  
  // Creamos una copia reactiva de la data original para no modificar el prop directamente
  const localData = reactive({ ...props.peliculaData })
  
  // Actualizamos localData si cambia peliculaData externamente
  watch(() => props.peliculaData, (nuevo) => {
    Object.assign(localData, nuevo)
  })
  
  const handleSubmit = () => {
    emit('submit', { ...localData })
  }
  </script>
  