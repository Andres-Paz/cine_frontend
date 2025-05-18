<template>
  <div class="flex items-center justify-center bg-gray-100 h-full">
    <div class="bg-white w-3/4 h-3/4 rounded-2xl shadow-lg p-6">
      <div class="relative flex justify-between items-center mb-6">
        <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 z-0">
            <div
            class="h-0.5 bg-blue-600 transition-all duration-300"
            :style="{
                width: step === 1 ? '0%' : step === 2 ? '50%' : '100%'
            }"
            ></div>
        </div>

        <div
            v-for="n in 3"
            :key="n"
            class="relative z-10 w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-300"
            :class="{
            'bg-blue-600 text-white border-blue-600': step >= n,
            'bg-white text-gray-500 border-gray-300': step < n,
            }"
        >
            {{ n }}
        </div>
        </div>

      <div class="min-h-[200px]">
        <slot v-if="step === 1" name="step1" />
        <slot v-else-if="step === 2" name="step2" />
        <slot v-else name="step3" />
      </div>

      <div class="flex justify-between mt-6">
        <button
          v-if="step === 1"
          @click="cancel"
          class="text-gray-600 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Cancelar
        </button>
        <button
          v-else
          @click="prevStep"
          class="text-gray-600 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Regresar
        </button>

        <button
          v-if="step < 3"
          @click="nextStep"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Siguiente
        </button>
        <button
          v-else
          @click="finish"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Finalizar compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const step = ref(1)

const nextStep = () => {
  if (step.value < 3) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const cancel = () => {
  // Puedes emitir un evento o navegar
  alert('Proceso cancelado')
}

const finish = () => {
  // Finalizar proceso
  alert('Compra finalizada')
}
</script>
