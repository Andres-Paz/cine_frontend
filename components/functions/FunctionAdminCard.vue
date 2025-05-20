<template>
  <div class="bg-white p-4 m-2 rounded-xl shadow-md w-full max-w-xs border border-gray-200">
    <div class="flex flex-wrap gap-3 items-center justify-start">
      <Calendar1 />
      <h3 class="text-xl font-semibold text-gray-800">{{ fechaFormateada }}</h3>
    </div>

    <div class="mt-2 ml-4 space-y-1 text-sm text-gray-600">
      <p><span class="font-medium">Tipo:</span> {{ funcion.sala_tipo }}</p>
      <p><span class="font-medium">Hora inicio:</span> {{ funcion.hora_inicio }}</p>
      <p><span class="font-medium">Hora final:</span> {{ funcion.hora_final }}</p>
      <p><span class="font-medium">Sala:</span> {{ funcion.sala_nombre }}</p>
      <p><span class="font-medium">Asientos disponibles:</span> {{ funcion.cupo_disponible }}</p>
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
import { Trash2, Pencil, Calendar1 } from 'lucide-vue-next'

const props = defineProps({
  funcion: {
    type: Object,
    required: true
  }
})

const fechaFormateada = computed(() => {
  const fecha = new Date(props.funcion.fecha);
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(fecha);
});

</script>