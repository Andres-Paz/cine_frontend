<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50">
    <div class="bg-white w-full max-w-md rounded-xl shadow-lg relative p-6">
      <!-- Botón X -->
      <button
        @click="$emit('cancelar')"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
      >
        <X />
      </button>

      <!-- Título -->
      <h2 class="text-xl font-semibold mb-4">{{ titulo }}</h2>

      <!-- Cuerpo del diálogo -->
      <div class="mb-6">
        <slot />
      </div>

      <!-- Footer con botones -->
      <div class="flex justify-between space-x-3">
        <button
          @click="$emit('cancelar')"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 cursor-pointer"
        >
          {{ cancelarText }}
        </button>
        <button
          @click="$emit('aceptar')"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          :class="aceptarColor ? `bg-${aceptarColor}-600 hover:bg-${aceptarColor}-700`: ''"
        >
          {{ aceptarText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'
const isOpen = defineModel('open', {
  type: Boolean,
  required: true,
  default: false
})

const props = defineProps({
  titulo: String,
  aceptarText: {
    type: String,
    default: 'Aceptar'
  },
  cancelarText: {
    type: String,
    default: 'Cancelar'
  },
  aceptarColor: {
    type: String,
    default: 'blue'
  }
})

const emit = defineEmits(['aceptar', 'cancelar'])
</script>
