<template>
    <NuxtLink 
      v-if="!is_admin"
      :to="`/peliculas/${movie.id}`"
      class="bg-white p-4 m-4 rounded-xl shadow-lg w-full max-w-sm border border-gray-100"
    >
      <h3 class="text-2xl font-semibold text-gray-900 mb-1">{{ movie.nombre }}</h3>
      <p class="text-sm text-gray-500 mb-4">Clasificación: <span class="font-medium">{{ movie.clasificacion }}</span></p>
      <div class="flex items-center justify-center">
        <img :src="movie.imagen" alt="Imagen película" class="w-auto max-w-full h-auto max-h-64 object-contain rounded-lg mt-4 bg-black/10" />
      </div>
    </NuxtLink>
    <div 
      v-else 
      class="bg-white p-4 m-4 rounded-xl shadow-lg w-full max-w-sm border border-gray-100"
    >
      <h3 class="text-2xl font-semibold text-gray-900 mb-1">{{ movie.nombre }}</h3>
      <p class="text-sm text-gray-500 mb-4">Clasificación: <span class="font-medium">{{ movie.clasificacion }}</span></p>
      <div class="flex items-center justify-center min-h-64 w-full">
        <img :src="movie.imagen" alt="Imagen película" class="w-auto h-full max-h-60 object-contain rounded-lg mt-4 bg-black/10" />
      </div>
    <div class="flex justify-between items-end mt-4 text-sm">
      <button
        @click="$emit('eliminar')"
        class="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all cursor-pointer"
      >
        <Trash2 class="w-4 h-4" />
        Eliminar
      </button>
      <button
        @click="$emit('modificar')"
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

  defineEmits(['eliminar', 'modificar'])
  </script>
  