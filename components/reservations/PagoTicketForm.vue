<template>
  <div class="flex flex-col gap-y-6 p-6 bg-white rounded-xl shadow-md border border-gray-200 w-full max-w-xl">
    <div class="flex flex-col gap-4">
      <!-- Número de tarjeta con 4 inputs -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Número de tarjeta</label>
        <div class="flex gap-2">
          <input
            v-for="(segment, index) in cardSegments"
            :key="index"
            v-model="cardSegments[index]"
            @input="handleSegmentInput(index)"
            maxlength="4"
            type="text"
            inputmode="numeric"
            class="w-1/4 p-2 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p v-if="cardErrors?.number" class="text-red-600 text-sm mt-1">Número de tarjeta inválido</p>
      </div>

      <!-- Nombre del titular -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre del titular</label>
        <input
          v-model="cardData.nombre"
          type="text"
          placeholder="Juan Pérez"
          class="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Expiración y CVV -->
      <div class="flex gap-4">
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700">Expiración (MM/AA)</label>
          <input
            v-model="cardData.expiry"
            type="text"
            maxlength="5"
            placeholder="08/25"
            class="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="cardErrors?.expiry" class="text-red-600 text-sm mt-1">Fecha inválida</p>
        </div>

        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700">CVV</label>
          <input
            v-model="cardData.cvv"
            type="text"
            maxlength="4"
            placeholder="123"
            class="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="cardErrors?.cvv" class="text-red-600 text-sm mt-1">CVV inválido</p>
        </div>
      </div>
    </div>

    <!-- Total -->
    <div class="text-lg font-medium text-gray-800">
      Total: Q{{ total.toFixed(2) }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const cardData = defineModel('card', {
  type: Object,
  required: true,
  default: {
    number: '',
    nombre: '',
    expiry: '',
    cvv: ''
  }
})

const cardErrors = defineModel('errors', {
  type: Object,
  required: true,
  default: {
    number: '',
    expiry: '',
    cvv: ''
  }
})

const props = defineProps({
  cantidadPersonas: {
    type: Number,
    required: true,
    default: 1
  },
  precio: {
    type: Number,
    required: true,
    default: 50.0
  }
})

const total = computed(() => props.cantidadPersonas * props.precio)

// 4 segmentos del número de tarjeta
const cardSegments = ref(['', '', '', ''])

// Actualiza el valor total concatenado
watch(cardSegments.value, (segments) => {
  cardData.value.number = segments.join('')
})

// Rellena segmentos si viene ya con datos
watch(() => cardData.value.number, (fullNumber) => {
  if (fullNumber.length === 16) {
    cardSegments.value = [
      fullNumber.slice(0, 4),
      fullNumber.slice(4, 8),
      fullNumber.slice(8, 12),
      fullNumber.slice(12, 16)
    ]
  }
})

// Avanza automáticamente al siguiente input
const handleSegmentInput = (index) => {
  const value = cardSegments.value[index]
  if (value.length === 4 && index < 3) {
    const inputs = document.querySelectorAll('input[type="text"]')
    inputs[index + 1]?.focus()
  }
}
</script>
