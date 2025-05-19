<template>
    <form class="space-y-4">
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
    </form>
  </template>
  
  <script setup>
  
  const localData = defineModel('peliculaData', {
    type: Object,
    required: true,
    default: () => ({
      nombre: '',
      duracion: '',
      clasificacion: '',
      imagen: '',
      fecha_inicio: '',
      fecha_fin: ''
    })
  })
  
  </script>
  