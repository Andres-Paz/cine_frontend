<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white w-full max-w-md rounded-xl shadow-lg relative p-6">
      <!-- Botón X -->
      <button
        @click="$emit('cancelar')"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>

      <!-- Título -->
      <h2 class="text-xl font-semibold mb-4">{{ titulo }}</h2>

      <!-- Cuerpo del diálogo -->
      <div class="mb-6">
        <slot />
      </div>

      <!-- Footer con botones -->
      <div class="flex justify-end space-x-3">
        <button
          @click="$emit('cancelar')"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
        >
          {{ cancelarText }}
        </button>
        <button
          @click="$emit('aceptar')"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {{ aceptarText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  titulo: String,
  aceptarText: {
    type: String,
    default: 'Aceptar'
  },
  cancelarText: {
    type: String,
    default: 'Cancelar'
  }
})

const emit = defineEmits(['aceptar', 'cancelar'])
</script>
