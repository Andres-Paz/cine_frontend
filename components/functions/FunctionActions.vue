<template>
  <div class="flex justify-between items-center p-4">
    <!-- Filtros -->
    <div class="flex flex-wrap w-full items-center justify-center gap-5">
      <!-- Filtro por película -->
      <div class="flex  items-center gap-2 w-64">
        <TvMinimal class="w-5 h-5 text-gray-600" />
        <select
          v-model="filter.pelicula"
          class="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todas las películas</option>
          <option
            v-for="(pelicula) in peliculas"
            :key="pelicula.id"
            :value="pelicula.id"
          >
            {{ pelicula.nombre }}
          </option>
        </select>
      </div>

      <!-- Filtro por sala -->
      <div class="flex items-center gap-2 w-64">
        <Film class="w-5 h-5 text-gray-600" />
        <select
          v-model="filter.sala"
          class="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todas las salas</option>
          <option
            v-for="(sala) in salas"
            :key="sala.id"
            :value="sala.id"
          >
            {{ sala.nombre }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-2 w-64">
        <Calendar1 class="w-5 h-5 text-gray-600" />
        <input
            type="date"
            v-model="filter.fecha"
            class="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    <!-- Botón de agregar -->
    <button 
      v-if="is_admin" 
      class="bg-blue-200 flex gap-3 p-2.5 items-center text-center justify-center cursor-pointer hover:bg-blue-300 rounded-lg w-64"
      @click="$emit('agregar')"
    >
      <Plus />
      Agregar función
    </button>
  </div>
</template>

<script setup>
import { TvMinimal, Film, Plus, Calendar1 } from 'lucide-vue-next'

const filter = defineModel('filter', { type: Object, default: {}, required: true })

defineProps({
  peliculas: {
    type: Object,
    required: true,
    default: () => ({})
  },
  salas: {
    type: Object,
    required: true,
    default: () => ({})
  },
  is_admin: {
    type: Boolean,
    required: true,
    default: false
  }
})

defineEmits(['agregar'])
</script>
