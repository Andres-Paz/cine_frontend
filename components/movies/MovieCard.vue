<template>
    <NuxtLink 
      v-if="!is_admin"
      :to="`/peliculas/${movie.id}`"
      class="bg-white p-4 m-4 rounded-xl shadow-lg w-full max-w-sm border border-gray-100"
      >
      <h3 class="text-2xl font-semibold text-gray-900 mb-1">{{ movie.nombre }}</h3>
      <p class="text-sm text-gray-500 mb-4">Clasificación: <span class="font-medium">{{ movie.clasificacion }}</span></p>
      <p class="text-sm text-gray-500 mb-4">Duracion: <span class="font-medium">{{ movie.duracion }}</span> min </p>
      <img :src="movie.imagen" alt="Imagen película" class="w-full h-48 object-cover rounded-lg mt-4" />
    </NuxtLink>
    <div 
      v-else 
      class="bg-white p-4 m-4 rounded-xl shadow-lg w-full max-w-sm border border-gray-100"
    >
      <h3 class="text-2xl font-semibold text-gray-900 mb-1">{{ movie.nombre }}</h3>
      <p class="text-sm text-gray-500 mb-4">Clasificación: <span class="font-medium">{{ movie.clasificacion }}</span></p>
      <p class="text-sm text-gray-500 mb-4">Duracion: <span class="font-medium">{{ movie.duracion }}</span> min </p>
      <img :src="movie.imagen" alt="Imagen película" class="w-full h-48 object-cover rounded-lg mt-4" />
    <div class="flex justify-between mt-4 text-sm">
      <button
        class="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all cursor-pointer"
      >
        <Trash2 class="w-4 h-4" />
        Eliminar
      </button>
      <button
        class="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all cursor-pointer"
      >
        <Pencil class="w-4 h-4" />
        Modificar
      </button>
    </div>
  </div>
  </template>
  
  <script setup>
  import { Trash2, Pencil } from 'lucide-vue-next';
  defineProps({
    movie: {
      type: Object,
      required: true,
    },
    is_admin: {
        type: Boolean,
        required: true, 
        default: false
    }
  })
  </script>
  