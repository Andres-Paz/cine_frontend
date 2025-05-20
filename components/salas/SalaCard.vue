<template>
  <div class="bg-white p-4 m-2 rounded-xl shadow-md w-full max-w-xs border border-gray-200">
    <h3 class="text-xl font-semibold text-gray-800">{{ sala.nombre }}</h3>

    <div class="mt-2 space-y-1 text-sm text-gray-600">
      <p><span class="font-medium">Tipo:</span> {{ sala.tipo }}</p>
      <p><span class="font-medium">Columnas:</span> {{ sala.columnas }}</p>
      <p><span class="font-medium">Filas:</span> {{ sala.filas }}</p>
      <p><span class="font-medium">Cupo:</span> {{ sala.cupo }}</p>
    </div>

    <div class="flex justify-between items-center mt-4">
      <button
        @click="$emit('eliminar')"
        class="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all cursor-pointer"
      >
        <Trash2 class="w-4 h-4" />
        <span class="text-sm">Eliminar</span>
      </button>
      <button
        @click="$emit('modificar')"
        class="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all cursor-pointer"
      >
        <Pencil class="w-4 h-4" />
        <span class="text-sm">Modificar</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { Trash2, Pencil } from 'lucide-vue-next'

defineProps({
  sala: {
    type: Object,
    required: true
  }
})

defineEmits(['eliminar', 'modificar'])
</script>