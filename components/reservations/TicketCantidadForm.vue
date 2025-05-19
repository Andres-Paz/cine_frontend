<template>
  <div class="flex flex-col gap-y-4 p-6 bg-white rounded-xl shadow-md border border-gray-200 w-1/2">
    <div class="text-sm text-gray-600">
      <p><span class="font-medium">Cupo disponible:</span> {{ cupoDisponible }}</p>
    </div>

    <div class="flex items-center gap-3">
      <label for="cantidad" class="text-base font-medium text-gray-700">Cantidad:</label>
      <input
        id="cantidad"
        type="number"
        v-model="cantidadPersonas"
        class="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="1"
        :max="cupoDisponible"
      />

      <div class="text-xl flex gap-2">
       <p>X Q{{ precio.toFixed(2) }} = </p><strong> Q{{ total.toFixed(2) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
const cantidadPersonas = defineModel('cantidad', { type: Number, required: true, default: 0 })

const props = defineProps({
  cupoDisponible: {
    type: Number,
    required: true,
    default: 1
  },
  precio: {
    type: Number,
    required: true,
    default: 50.00
  }
})

const total = computed(()=> {
  return cantidadPersonas.value * props.precio
})

</script>
